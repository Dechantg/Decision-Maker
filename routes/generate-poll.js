
const router = require("express").Router();
// const express     = require('express');
// const router      = express.Router();
const uuid        = require('uuid');
const newPoll = require('../db/queries/add_new_poll');
const addOptions = require('../db/queries/add_poll_options');
const userExists = require('../db/queries/user_email_exists');
const addNewEmails = require('../db/queries/add_new_unregistered_emails');
const addAuthorizedToVote = require('../db/queries/add_new_authorized_user_to_vote');
const processEmails = require('../public/scripts/processEmails')



const db = require('../db/connection');
const { calculateTimestamps } = require('../utils/calculateTimestamps');



router.post('/', async (req, res) => {
  try {
    const {pollName, pollDescription, options, emails, opensAt, closesAt} = req.body;

    console.log(req.body)

    const userId = req.session.user.id
    // const creatorEmail = req.session.user.email

    const pollUuid = uuid.v4();


    const createdPoll = await newPoll(pollName, pollDescription, userId, pollUuid, opensAt, closesAt)

    const addedOptions = await addOptions(createdPoll.id, options)




const { authorizedIds, emailsToAdd } = await processEmails(emails);



const newEmailsAdded = await addNewEmails(emailsToAdd);

newEmailsAdded.forEach(obj => authorizedIds.push(obj.id));

authorizedIds.push(userId);


const updatedAuthorizedToVote = await addAuthorizedToVote(authorizedIds, createdPoll.id)






    res.json({ message: 'Data received successfully!', pollUuid });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
