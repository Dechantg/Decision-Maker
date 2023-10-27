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
const userExists     = require('../db/queries/user_exists');
const getWinners     = require('../db/queries/get_winners');


router.get('/', (req, res) => {
  res.render('poll-results');

});

router.get('/:id', (req, res) => {
  const values = req.params.id;
  // const myCookieValue = req.cookies.myCookie;
  // console.log("here is the cookie value", myCookieValue)
  // console.log("cookie does or does not exist", req.session.userId)
  console.log(values);

  const userEmail = req.cookies.choiceMaker;

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
                // Now call getWinners and pass its result to render
                getWinners(values).then((winnerData) => {
                  console.log(userEmail);
                  //  res.json({ pollData, questionData, values, userEmail, winnerData });
                  res.render('poll-results', { pollData, questionData, values, userEmail, winnerData });
                }).catch((getWinnersError) => {
                  console.error(getWinnersError);
                  res.status(500).send("Internal Server Error");
                });
              })
              .catch((getQuestionsError) => {
                console.error(getQuestionsError);
                res.status(500).send("Internal Server Error");
              });
          })
          .catch((pollDetailsError) => {
            console.error(pollDetailsError);
            res.status(500).send("Internal Server Error");
          });
      }

  }).catch((error) => {
    console.error(error);
    res.status(500).send("Internal Server Error");
  });
});

module.exports = router;
