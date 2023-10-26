const express       = require('express');
const router        = express.Router();
const userQueries   = require('../db/queries/users');
const uuid          = require('uuid');
const pollExists    = require('../db/queries/does_poll_exist');
const getQuestions  = require('../db/queries/get_questions_for_poll');
const reisterVotes  = require('../db/queries/register_votes')
const pollDetails   = require('../db/queries/return_poll_details');
const db = require('../db/connection');

const newUuid       = uuid.v4();

// const { Pool }      = require('pg');

// const pool = new Pool({
//   user:     process.env.DB_USER,
//   password: process.env.DB_PASS,
//   host:     process.env.DB_HOST,
//   database: process.env.DB_NAME,
// });


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
            res.json({ pollData, questionData });

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
  const uuid = req.params.id
  const responceData = req.body.responceData
  responceData


});




module.exports = router;
