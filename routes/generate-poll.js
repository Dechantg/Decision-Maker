
const router = require("express").Router();
// const express     = require('express');
// const router      = express.Router();
const uuid        = require('uuid');
const newPoll = require('../db/queries/add_new_poll')


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

    console.log("the poll has been sucessfully created", createdPoll)




    res.json({ message: 'Data received successfully!' });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
