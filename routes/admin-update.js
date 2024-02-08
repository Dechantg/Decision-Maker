
const express           = require('express');
const router            = express.Router();
const getByUuid         = require('../db/queries/get_poll_by_uuid')
const authorizedEmails  = require('../db/queries/get_authorized_emails')
const addOptions        = require('../db/queries/add_poll_options')
const updateOptions     = require('../db/queries/update_options')
const addNewEmails       = require('../db/queries/add_new_unregistered_emails');
const addAuthorizedToVote = require('../db/queries/add_new_authorized_user_to_vote');
const removeAuthorizedEmail = require('../db/queries/remove_auuthorized_email')
const updateDetails = require('../db/queries/update_poll_details')
const removeUnauthorizedVotes = require('../db/queries/remove_unauthorized_votes')
const processEmails = require('../public/scripts/processEmails')


const db = require('../db/connection');




router.post('/', async (req, res) => {
  try {
    const {pollName, pollDescription, options, emails, opensAt, closesAt, pollId, uuid} = req.body;

    const userId = req.session.user ? req.session.user.id : null;
    const userEmail = req.session.user ? req.session.user.email : null;


    const details = await getByUuid(uuid);

    pollCreator = details.poll_creator_id

    const updatedPollDetails = await updateDetails(pollId, pollName, pollDescription, opensAt, closesAt, pollCreator)

    console.log("data back from the details update: ", updatedPollDetails)


const existingOptions = [];
const newOptions = [];

const allAuthorizedEmails = await authorizedEmails(pollId, pollCreator);

const emailArray = allAuthorizedEmails.map(item => item.email);

const newEmails = emails.filter(email => !emailArray.includes(email));

const deletedEmails = emailArray.filter(email => !emails.includes(email));

if (newEmails.length >0) {
const { authorizedIds, emailsToAdd } = await processEmails(newEmails);
const newEmailsAdded = await addNewEmails(emailsToAdd);
newEmailsAdded.forEach(obj => authorizedIds.push(obj.id));
const updatedAuthorizedToVote = await addAuthorizedToVote(authorizedIds, pollId);
};

if (deletedEmails.length >0) {
  const { authorizedIds, emailsToAdd } = await processEmails(deletedEmails);
  const newEmailsAdded = await addNewEmails(emailsToAdd);
  newEmailsAdded.forEach(obj => authorizedIds.push(obj.id));
  const updatedAuthorizedToVote = await removeAuthorizedEmail(authorizedIds, pollId);
  const unauthorizedVotesRemoved = await removeUnauthorizedVotes(authorizedIds, pollId);
  };


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

