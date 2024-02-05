


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


const db = require('../db/connection');




router.post('/', async (req, res) => {
  try {
    const {pollName, pollDescription, options, emails, opensAt, closesAt, pollId, uuid} = req.body;

    console.log("is the coming from inside my update poll?", options)

    // const userId = req.session.user.id

    const existingOptions = [];
const newOptions = [];

options.forEach(option => {
  if (option.id) {
    existingOptions.push(option);
  } else {
    const { id, ...rest } = option;
    newOptions.push(rest);
  }
});

// const addedOptions = await addOptions(pollId, newOptions);
// const updatedOptions = await updateOptions(existingOptions);

console.log('Existing Options:', existingOptions);
console.log('New Options:', newOptions);
// console.log('here is the post new options add', addedOptions)




res.json({ message: 'Data received successfully!' });

  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;

