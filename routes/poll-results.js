const express         = require('express');
const router          = express.Router();
const pollExists      = require('../db/queries/does_poll_exist');
const getQuestions    = require('../db/queries/get_questions_for_poll');
const pollDetails     = require('../db/queries/return_poll_details');
const userIdbyEmail   = require('../db/queries/find_id_by_email');
const getWinners      = require('../db/queries/get_winners');
const allAuthorized   = require('../db/queries/get_all_authorized');
const allOwned        = require('../db/queries/get_all_owned');
const bodyParser      = require('body-parser');

router.use(bodyParser.json());

router.get('/', async (req, res) => {
  try {
    const userEmail = req.session.user.email

    const usersId = req.session.user.id;

    const authorized = await allAuthorized(usersId);
    const owned = await allOwned(usersId);

    res.render('poll-list', { authorized, owned, userEmail, usersId });
  } catch (error) {

    console.error('An error occurred:', error);

    res.status(500).send('Internal Server Error');
  }
});


router.get('/:id', async (req, res) => {
  try {
    const values = req.params.id;
    console.log(values);

    const userId = req.session.user ? req.session.user.id : null;
    const userEmail = req.session.user ? req.session.user.email : null;

    const uuidExists = await pollExists(values);

    if (!uuidExists) {
      res.send("Error: That is not a valid uuid");
    } else {
      console.log('log for the id being passed in for the voting link', values);

      const pollData = await pollDetails(values);
      const questionData = await getQuestions(values);
      const winnerData = await getWinners(values);

      console.log(userEmail);

      res.render('poll-results', { pollData, questionData, values, userEmail, winnerData });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});






module.exports = router;
