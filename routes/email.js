


const express           = require('express');
const router            = express.Router();
const userIdByEmail     = require('../db/queries/find_id_by_email');
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
    const {email, uuid, pollId} = req.body;

    const userId = req.session.user ? req.session.user.id : null;
    const userEmail = req.session.user ? req.session.user.email : null;

    console.log("here is the email being passed in:", email);
    console.log("here is the uuid being passed in: ", uuid);
    console.log("here is the pollId being passed in: ", pollId);

    const voterId = await userIdByEmail(email);

    console.log("here is the voter id being fetched by email: ", voterId[0].id);










res.json({ message: 'Data received successfully!' });

  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;

