const express       = require('express');
const router        = express.Router();
const userQueries   = require('../db/queries/users');
const uuid          = require('uuid');
const pollExists    = require('../db/queries/does_poll_exist');
const getQuestions  = require('../db/queries/get_questions_for_poll');
const reisterVotes  = require('../db/queries/register_votes')
const pollDetails   = require('../db/queries/return_poll_details');
const addAnswer     = require('../db/queries/add_result_to_answers');
const hasVoted     = require('../db/queries/has_voted');
const db = require('../db/connection');

const newUuid       = uuid.v4();


router.get('/:id', (req, res) => {
  const values = req.params.id;
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



        })
        .catch((pollDetailsError) => {
          console.error(pollDetailsError);
          res.status(500).send("Internal Server Error");
        });
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send("Internal Server Error");
  });
});


router.post('/:id/submit', (req, res) => {
  const pollId = req.body.poll_id;
  delete req.body.poll_id;
  const userId = 1
  console.log(pollId)
  const responceData = req.body;
  console.log(responceData);

  // hasVoted(userId, pollId));

  for (const key in responceData) {
    if (responceData.hasOwnProperty(key)) {
      const question = key;
      const result = responceData[key];
      addAnswer(userId, pollId, question, result)

    }
  }



});



module.exports = router;
