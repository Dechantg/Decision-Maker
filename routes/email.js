


const express           = require('express');
const router            = express.Router();
const pollDetails       = require('../db/queries/return_poll_details');
const moment            = require('moment');
const updateEmailStatus = require('../db/queries/set_emailed_status');
const processEmails = require('../public/scripts/processEmails');
const getCreatorDetails = require('../db/queries/get_user_data_by_id');
const {sendEmail, sendAdminEmail} = require('../public/scripts/mailgun');



router.post('/', async(req, res) => {
  try {
    const {emails, uuid, pollId} = req.body;

    // const userId = req.session.user ? req.session.user.id : null;
    // const userEmail = req.session.user ? req.session.user.email : null;

    console.log("here is the email being passed in:", emails);
    console.log("here is the uuid being passed in: ", uuid);
    console.log("here is the pollId being passed in: ", pollId);

    const pollData = await pollDetails(uuid);
    const { authorizedIds, emailsToAdd } = await processEmails(emails);

    const opensAt = moment(pollData[0].created_at).format('MMM DD, YYYY hh:mm A');
    const closesAt = moment(pollData[0].closes_at).format('MMM DD, YYYY hh:mm A');


    const creator = await getCreatorDetails(pollData[0].poll_creator_id);

    console.log("here is the pollData fetch test", pollData);
    console.log("here is the creator fetch test", creator);

    const pollDataToEmail = {
      emails: emails,
      uuid: uuid,
      firstName: creator.first_name,
      lastName: creator.last_name,
      pollName: pollData[0].poll_name,
      pollDescription: pollData[0].poll_description,
      creatorEmail: creator.email,
      opensAt: opensAt,
      closesAt: closesAt
    };

    await sendEmail(pollDataToEmail);

    const changeToTrue = true;

    await updateEmailStatus(authorizedIds, pollId, changeToTrue);




    res.json({ message: 'Data received successfully!' });

  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;

