

const express           = require('express');
const router            = express.Router();
const getByUuid         = require('../db/queries/get_poll_by_uuid')
const moment            = require('moment');
const getQuestions      = require('../db/queries/get_questions_by_id')
const authorizedEmails  = require('../db/queries/get_authorized_emails')


const db = require('../db/connection');




router.get('/:id', async (req, res) => {
  try {
    // Fetch the user's email from cookies
    // const userEmail = req.cookies.choiceMaker;
    // console.log("user email when no cookie", userEmail)

    const uuid = req.params.id
    // const uuid = '2a411155-d49a-4f1b-b3b6-f6da34ab0f0e';

    let userEmail = null;

    const pollDetails = await getByUuid(uuid);

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

    // console.log("here are the fetched questiuons", mappedOptions)


    const formData = {
      pollName: pollDetails.poll_name,
      pollDescription: pollDetails.poll_description,
      options: mappedOptions.map(option => ({ ...option})),
      emails: allAuthorizedEmails,
      opensAt: formattedOpensAt,
      closesAt: formattedClosesAt,
      pollActive: pollDetails.poll_active,
      pollDeleted: pollDetails.poll_deleted
    };

    // console.log("here is thge form data from the newly parsed cosnt: ", formData)

    if (req.session.user && req.session.user.email) {
      userEmail = req.session.user.email;
    }



    res.render('admin', {userEmail, formData, uuid, pollId});
  } catch (error) {

    console.error('An error occurred:', error);

    res.status(500).send('Internal Server Error');
  }
});




module.exports = router;
