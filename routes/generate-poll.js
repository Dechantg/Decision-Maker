
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
    const userId = 1

    const pollUuid = uuid.v4();

    // console.log('Received data:', formData);
    console.log("Poll Name: ", pollName);
    console.log("Poll Description: ", pollDescription);
    console.log("Options Array: ", options);
    console.log("user emails: ", emails);
    console.log("poll opens at: ", opensAt);
    console.log("poll closes at: ", closesAt);
    console.log("Poll uuid: ", pollUuid);

    const createdPoll = await newPoll(pollName, pollDescription, userId, pollUuid, opensAt, closesAt)

    const addedOptions = await addOptions(createdPoll.id, options)

    console.log("here are the added options ", addedOptions)

    console.log("here are the voter emails added")

    const processEmails = async (emails) => {
      const idsToAuthorize = {};
      const emailsToAdd = [];

      for (const email of emails) {
        const userEmail = await userExists(email);

        if (userEmail && userEmail.id) {
          // Use the user ID as the key in the idsToAuthorize object
          idsToAuthorize[userEmail.id] = true;
        } else {
          emailsToAdd.push(email);
        }
      }

      // Extract the IDs from the object keys
      const authorizedIds = Object.keys(idsToAuthorize);

      return { authorizedIds, emailsToAdd };
    };

const { authorizedIds, emailsToAdd } = await processEmails(emails);


console.log("here is the ids to authoriz: ", authorizedIds);
console.log("here is the emails to add: ", emailsToAdd);

const newEmailsAdded = await addNewEmails(emailsToAdd);

newEmailsAdded.forEach(obj => authorizedIds.push(obj.id));


console.log("here is the updated ids for the newly added emails: ", authorizedIds);

const updatedAuthorizedToVote = await addAuthorizedToVote(authorizedIds, createdPoll.id)

console.log("no clue whats coming abck from the authadtedauthorizedtov ote function", updatedAuthorizedToVote)

console.log("the poll has been sucessfully created", createdPoll.id);




    res.json({ message: 'Data received successfully!' });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
