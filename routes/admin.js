

const express           = require('express');
const router          = express.Router();
const getByUuid         = require('../db/queries/get_poll_by_uuid')
const moment            = require('moment');
const getQuestions      = require('../db/queries/get_questions_by_id')
const authorizedEmails  = require('../db/queries/get_authorized_emails')
const allOwned        = require('../db/queries/get_all_owned');
const bodyParser      = require('body-parser');


router.use(bodyParser.json());


router.get('/', async (req, res) => {
  try {

    const userId = req.session.user ? req.session.user.id : null;
    const userEmail = req.session.user ? req.session.user.email : null;

    const deleted = false;
    const owned = await allOwned(userId, deleted);

    const formattedOwned = owned.map((poll) => ({
      ...poll,
      created_at: moment(poll.created_at).format('MMM DD, YYYY hh:mm A'),
      opens_at: moment(poll.opens_at).format('MMM DD, YYYY hh:mm A'),
      closes_at: moment(poll.closes_at).format('MMM DD, YYYY hh:mm A'),
    }));

    res.render('admin-list', { owned: formattedOwned, userEmail, userId });
  } catch (error) {

    console.error('An error occurred:', error);

    res.status(500).send('Internal Server Error');
  }
});




module.exports = router;



router.get('/:id', async (req, res) => {
  try {

    const uuid = req.params.id

    const userId = req.session.user ? req.session.user.id : null;
    const userEmail = req.session.user ? req.session.user.email : null;

    const pollDetails = await getByUuid(uuid);

    if (pollDetails.poll_creator_id !== userId) {
      return res.redirect('/polls');
    }


    const formattedOpensAt = moment(pollDetails.opens_at).format('YYYY-MM-DD HH:mm:ss');
    const formattedClosesAt = moment(pollDetails.closes_at).format('YYYY-MM-DD HH:mm:ss');

    const pollId = pollDetails.id;

    const pollCreator = pollDetails.poll_creator_id

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
      opensAt: formattedOpensAt,
      closesAt: formattedClosesAt,
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
