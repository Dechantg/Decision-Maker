

const express           = require('express');
const router          = express.Router();
const getByUuid         = require('../db/queries/get_poll_by_uuid');
const getQuestions      = require('../db/queries/get_questions_by_id');
const authorizedEmails  = require('../db/queries/get_authorized_emails');
const allOwned        = require('../db/queries/get_all_owned');
const convertToLocal  = require('../public/scripts/convertToLocal');

const bodyParser      = require('body-parser');


router.use(bodyParser.json());


router.get('/', async(req, res) => {
  try {

    const userId = req.session.user ? req.session.user.id : null;
    const userEmail = req.session.user ? req.session.user.email : null;

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log(`User's Timezone: ${userTimeZone}`);


    const deleted = false;
    const owned = await allOwned(userId, deleted);



    const formattedOwned = await convertToLocal(owned, userTimeZone);





    res.render('admin-list', { owned: formattedOwned, userEmail, userId });
  } catch (error) {

    console.error('An error occurred:', error);

    res.status(500).send('Internal Server Error');
  }
});




module.exports = router;



router.get('/:id', async(req, res) => {
  try {

    const uuid = req.params.id;

    const userId = req.session.user ? req.session.user.id : null;
    const userEmail = req.session.user ? req.session.user.email : null;

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log(`User's Timezone: ${userTimeZone}`);

    const pollDetails = await getByUuid(uuid);

    console.log("pollDetails from loading the admin page before my time shit function", pollDetails)

    if (pollDetails.poll_creator_id !== userId) {
      return res.redirect('/polls');
    }

    const pollTimes = [pollDetails];

    const formattedOwned = await convertToLocal(pollTimes, userTimeZone);

    const pollId = pollDetails.id;

    const pollCreator = pollDetails.poll_creator_id;

    const allAuthorizedEmails = await authorizedEmails(pollId, pollCreator);

    const fetchedOptions = await getQuestions(pollId);

    const mappedOptions = fetchedOptions.map(option => ({
      [option.title]: option.description,
      id: option.id
    }));



    const formData = {
      pollName: pollDetails.poll_name,
      pollDescription: pollDetails.poll_description,
      options: mappedOptions.map(option => ({ ...option})),
      emails: allAuthorizedEmails,
      opensAt: formattedOwned[0].opens_at,
      closesAt: formattedOwned[0].closes_at,
      pollActive: pollDetails.poll_active,
      pollDeleted: pollDetails.poll_deleted,
      pollForcedStatus: pollDetails.force_active_status
    };



    res.render('admin', {userEmail, formData, uuid, pollId});
  } catch (error) {

    console.error('An error occurred:', error);

    res.status(500).send('Internal Server Error');
  }
});




module.exports = router;
