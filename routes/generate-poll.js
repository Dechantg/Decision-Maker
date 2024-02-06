
const router = require("express").Router();
// const express     = require('express');
// const router      = express.Router();
const uuid        = require('uuid');
const newPoll = require('../db/queries/add_new_poll');
const addOptions = require('../db/queries/add_poll_options');
const userExists = require('../db/queries/user_email_exists');
const addNewEmails = require('../db/queries/add_new_unregistered_emails');
const addAuthorizedToVote = require('../db/queries/add_new_authorized_user_to_vote');


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



    const processEmails = async (emails) => {
      const idsToAuthorize = {};
      const emailsToAdd = [];

      for (const email of emails) {
        const userEmail = await userExists(email);

        if (userEmail && userEmail.id) {
          idsToAuthorize[userEmail.id] = true;
        } else {
          emailsToAdd.push(email);
        }
      }

      const authorizedIds = Object.keys(idsToAuthorize);

      return { authorizedIds, emailsToAdd };
    };

const { authorizedIds, emailsToAdd } = await processEmails(emails);


const newEmailsAdded = await addNewEmails(emailsToAdd);

newEmailsAdded.forEach(obj => authorizedIds.push(obj.id));

authorizedIds.push(userId);


const updatedAuthorizedToVote = await addAuthorizedToVote(authorizedIds, createdPoll.id)




    res.json({ message: 'Data received successfully!' });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
