const express         = require('express');
const router          = express.Router();
const userQueries     = require('../db/queries/users');
const uuid            = require('uuid');
const pollExists      = require('../db/queries/does_poll_exist');
const getQuestions    = require('../db/queries/get_questions_for_poll');
const reisterVotes    = require('../db/queries/register_votes')
const pollDetails     = require('../db/queries/return_poll_details');
const addAnswer       = require('../db/queries/add_result_to_answers');
const hasVoted        = require('../db/queries/has_voted');
const changeStatus    = require('../db/queries/change_vote_status');
const userEmailById   = require('../db/queries/find_user_by_email');
const userIdbyEmail   = require('../db/queries/find_id_by_email');
const insertBorda     = require('../db/queries/insert_borda_results');
// const cookieSession  = require('cookie-session');
// router.use(cookieSession({
//   name: 'session',
//   keys: process.env.COOKIE_KEY
// }));

const db              = require('../db/connection');

const newUuid         = uuid.v4();


router.get('/:id', (req, res) => {
  const values = req.params.id;
  // const myCookieValue = req.cookies.myCookie;
  // console.log("here is the cookie value", myCookieValue)
  // console.log("cookie does or does not exist", req.session.userId)
  console.log(values);

  pollExists(values)
    .then((uuidExists) => {
      if (!uuidExists) {
        res.send("Error: That is not a valid uuid");
      } else {
        console.log('log for the id being passed in for the voting link', values);
        return pollDetails(values)
        .then((pollData) => {
          return getQuestions(values)
          .then((questionData) => {
            // res.json({ pollData, questionData });
            res.render('submit-poll', { pollData, questionData });
          })
        }).catch((pollDetailsError) => {
          console.error(pollDetailsError);
          res.status(500).send("Internal Server Error");
        });
      }
  }).catch((error) => {
    console.error(error);
    res.status(500).send("Internal Server Error");
  });
});


router.post('/:id/submit', async (req, res) => {

  try {
    const pollId = req.body.poll_id;
    console.log("checking for pollid being placed properly", pollId);
    delete req.body.poll_id;
    const responceData = req.body;
    const userEmail = req.cookies.myCookie;
    console.log("first user email so find breakage", userEmail)
    const userIdObject = await userIdbyEmail(userEmail);
    console.log(userIdObject)
    const userId = userIdObject[0].id;
    console.log("second console log to find if userId is being retrieved", userId);

    if (userId === null) {
      return res.status(404).json({ error: 'User not found' });
    }

    const hasVotedResult = await hasVoted(userId, pollId);
    console.log("hasVotedResult:", hasVotedResult);

    if (hasVotedResult) {
      return res.status(403).json({ error: 'User has already voted' });
    }

    // The user is found; you can proceed
    console.log(userEmail);



    // Loop through and add the answers and add to the table
    for (const key in responceData) {
      if (responceData.hasOwnProperty(key)) {
        const question = key;
        const result = responceData[key];
        await addAnswer(userId, pollId, question, result);
      }
    }

    await changeStatus(userId, pollId);
    await insertBorda(pollId);

    // Send a response or redirect as needed
    res.json({ message: 'Email session cookie set and answers submitted successfully' });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
