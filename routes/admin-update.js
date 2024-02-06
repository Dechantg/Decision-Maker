


const express           = require('express');
const router            = express.Router();
const userEmailById     = require('../db/queries/find_user_by_email');
const getByUuid         = require('../db/queries/get_poll_by_uuid')
const pollExists        = require('../db/queries/does_poll_exist');
const pollDetails       = require('../db/queries/return_poll_details');
const moment            = require('moment');
const getQuestions      = require('../db/queries/get_questions_by_id')
const authorizedEmails  = require('../db/queries/get_authorized_emails')
const addOptions        = require('../db/queries/add_poll_options')
const updateOptions     = require('../db/queries/update_options')
const userExists = require('../db/queries/user_email_exists');
const addNewEmails = require('../db/queries/add_new_unregistered_emails');
const addAuthorizedToVote = require('../db/queries/add_new_authorized_user_to_vote');
const removeAuthorizedEmail = require('../db/queries/remove_auuthorized_email')
const updateDetails = require('../db/queries/update_poll_details')
const removeUnauthorizedVotes = require('../db/queries/remove_unauthorized_votes')


const db = require('../db/connection');




router.post('/', async (req, res) => {
  try {
    const {pollName, pollDescription, options, emails, opensAt, closesAt, pollId, uuid} = req.body;

    // console.log("is the coming from inside my update poll?", options)

    // const userId = req.session.user.id
// const userEmail = 'bob@example.com'
    // const creatorEmail = req.session.user.email

    const details = await getByUuid(uuid);

    pollCreator = details.poll_creator_id

    const updatedPollDetails = await updateDetails(pollId, pollName, pollDescription, opensAt, closesAt, pollCreator)

    console.log("data back from the details update: ", updatedPollDetails)


const existingOptions = [];
const newOptions = [];

const allAuthorizedEmails = await authorizedEmails(pollId, details.poll_creator_id);

const newEmails = await emails.filter(email => !allAuthorizedEmails.includes(email));

const deletedEmails = await allAuthorizedEmails.filter(email => !emails.includes(email));






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

if (newEmails.length >0) {
const { authorizedIds, emailsToAdd } = await processEmails(newEmails);
const newEmailsAdded = await addNewEmails(emailsToAdd);
newEmailsAdded.forEach(obj => authorizedIds.push(obj.id));
const updatedAuthorizedToVote = await addAuthorizedToVote(authorizedIds, pollId)
}

if (deletedEmails.length >0) {
  console.log("triggered inside the delete function")
  const { authorizedIds, emailsToAdd } = await processEmails(deletedEmails);
  const newEmailsAdded = await addNewEmails(emailsToAdd);
  newEmailsAdded.forEach(obj => authorizedIds.push(obj.id));
  const updatedAuthorizedToVote = await removeAuthorizedEmail(authorizedIds, pollId);
  const unauthorizedVotesRemoved = await removeUnauthorizedVotes(authorizedIds, pollId);

  }


options.forEach(option => {
  if (option.id) {
    existingOptions.push(option);
  } else {
    const { id, ...rest } = option;
    newOptions.push(rest);
  }
});


if (newOptions.length > 0) {
const addedOptions = await addOptions(pollId, newOptions);
return addedOptions
}




const updatedOptions = await updateOptions(existingOptions);


res.json({ message: 'Data received successfully!' });

  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;

