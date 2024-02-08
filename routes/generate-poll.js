
const router = require("express").Router();
// const express     = require('express');
// const router      = express.Router();
const uuid        = require('uuid');
const newPoll = require('../db/queries/add_new_poll');
const addOptions = require('../db/queries/add_poll_options');
const addNewEmails = require('../db/queries/add_new_unregistered_emails');
const addAuthorizedToVote = require('../db/queries/add_new_authorized_user_to_vote');
const processEmails = require('../public/scripts/processEmails');
const getCreatorDetails = require('../db/queries/get_user_data_by_id');
const {sendEmail, sendAdminEmail} = require('../public/scripts/mailgun');
const moment            = require('moment');
const updateEmailStatus = require('../db/queries/set_emailed_status');




router.post('/', async(req, res) => {
  try {
    const {pollName, pollDescription, options, emails, opensAt, closesAt} = req.body;

    console.log(req.body);

    const userId = req.session.user ? req.session.user.id : null;
    // const userEmail = req.session.user ? req.session.user.email : null;

    const pollUuid = uuid.v4();


    const createdPoll = await newPoll(pollName, pollDescription, userId, pollUuid, opensAt, closesAt);

    await addOptions(createdPoll.id, options);




    const { authorizedIds, emailsToAdd } = await processEmails(emails);


    console.log("here is the createdPoll variable after initial poll set", createdPoll);

    const newEmailsAdded = await addNewEmails(emailsToAdd);

    newEmailsAdded.forEach(obj => authorizedIds.push(obj.id));

    authorizedIds.push(userId);


    await addAuthorizedToVote(authorizedIds, createdPoll.id);


    const opensAtFormatted = moment(opensAt).format('MMM DD, YYYY hh:mm A');
    const closesAtFormatted = moment(closesAt).format('MMM DD, YYYY hh:mm A');


    const creator = await getCreatorDetails(userId);


    const pollDataToEmail = {
      emails: emails,
      uuid: pollUuid,
      firstName: creator.first_name,
      lastName: creator.last_name,
      pollName: pollName,
      pollDescription: pollDescription,
      creatorEmail: creator.email,
      opensAt: opensAtFormatted,
      closesAt: closesAtFormatted
    };

    await sendEmail(pollDataToEmail);
    await sendAdminEmail(pollDataToEmail);

    const changeToTrue = true;

    await updateEmailStatus(authorizedIds, createdPoll.id, changeToTrue);







    res.json({ message: 'Data received successfully!', pollUuid });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
