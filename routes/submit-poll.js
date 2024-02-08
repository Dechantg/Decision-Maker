const express           = require('express');
const router            = express.Router();
const pollExists        = require('../db/queries/does_poll_exist');
const getQuestions      = require('../db/queries/get_questions_for_poll');
const pollDetails       = require('../db/queries/return_poll_details');
const addAnswer         = require('../db/queries/add_result_to_answers');
const hasVoted          = require('../db/queries/has_voted');
const changeStatus      = require('../db/queries/change_vote_status');
const insertBorda       = require('../db/queries/insert_borda_results');
const userExists        = require('../db/queries/user_exists');
const authorizedEmail   = require('../db/queries/authorized_email');
const authorizedToVote  = require('../db/queries/authorized_to_vote');


router.get('/:id', async (req, res) => {
  try {
    const values = req.params.id;

    const userId = req.session.user ? req.session.user.id : null;
    const userEmail = req.session.user ? req.session.user.email : null;

    const uuidExists = await pollExists(values);

    if (!uuidExists) {
      res.send("Error: That is not a valid uuid");
    } else {

      const pollData = await pollDetails(values);

      const questionData = await getQuestions(values);
      const voteStatus = await hasVoted(userId, pollData[0].id)
      const pollClosed = pollData[0].poll_active

      res.render('submit-poll', { pollData, questionData, values, userEmail, voteStatus, pollClosed });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


router.post('/:id/submit', async (req, res) => {

  try {

    const userId = req.session.user ? req.session.user.id : null;
    const userEmail = req.session.user ? req.session.user.email : null;

    delete req.body.email;

    const user = await userExists(userEmail);

    if (!user) {
      return res.status(403).send(
        `You are not authorized for this poll.
         <a href="/login">Please sign in</a> to access this page.`
      );
    }



    const uuid = req.body.uuid;
    delete req.body.uuid;

    const pollId = req.body.poll_id;
    delete req.body.poll_id;

    const responceData = req.body;

    if (typeof userEmail === 'undefined') {
      return res.status(401).send({ error: 'User not logged in. Please log in.' });
    }


    const canVote = await authorizedToVote(userId, pollId);

    if (!canVote) {
      return res.status(403).json({ error: 'You are not authorized for this poll'});
    }

    const emails = await authorizedEmail(userId, pollId);

    const hasVotedResult = await hasVoted(userId, pollId);

    if (hasVotedResult) {
      return res.status(403).json({ error: 'User has already voted' });
    }

    for (const key in responceData) {
      if (responceData.hasOwnProperty(key)) {
        const question = key;
        const result = responceData[key];
        await addAnswer(userId, pollId, question, result);
      }
    }

    await changeStatus(userId, pollId);
    await insertBorda(pollId);

    res.redirect(`/results/${uuid}`);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
