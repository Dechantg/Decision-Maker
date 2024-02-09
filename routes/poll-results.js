const express         = require('express');
const router          = express.Router();
const pollExists      = require('../db/queries/does_poll_exist');
const getQuestions    = require('../db/queries/get_questions_for_poll');
const pollDetails     = require('../db/queries/return_poll_details');
const getWinners      = require('../db/queries/get_winners');
const allAuthorized   = require('../db/queries/get_all_authorized');
const allOwned        = require('../db/queries/get_all_owned');
const convertToLocal  = require('../public/scripts/convertToLocal');


const bodyParser      = require('body-parser');

router.use(bodyParser.json());

router.get('/', async(req, res) => {
  try {
    const userId = req.session.user ? req.session.user.id : null;
    const userEmail = req.session.user ? req.session.user.email : null;

    const authorized = await allAuthorized(userId);
    const owned = await allOwned(userId);

    res.render('poll-list', { authorized, owned, userEmail, userId });
  } catch (error) {

    console.error('An error occurred:', error);

    res.status(500).send('Internal Server Error');
  }
});


router.get('/:id', async(req, res) => {
  try {
    const values = req.params.id;
    console.log(values);

    const userId = req.session.user ? req.session.user.id : null;
    const userEmail = req.session.user ? req.session.user.email : null;

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log(`User's Timezone: ${userTimeZone}`);


    const uuidExists = await pollExists(values);

    if (!uuidExists) {
      res.send("Error: That is not a valid uuid");
    } else {

      const fetchedPollData = await pollDetails(values);

      const questionData = await getQuestions(values);
      const winnerData = await getWinners(values);

      const pollDataForTime = [fetchedPollData[0]];

      const pollData = await convertToLocal(pollDataForTime, userTimeZone);

      console.log(userEmail);

      res.render('poll-results', { pollData, questionData, values, userEmail, winnerData, userId });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});






module.exports = router;
