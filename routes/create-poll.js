
const express     = require('express');
const router      = express.Router();
const uuid        = require('uuid');
const newUuid     = uuid.v4();

const db = require('../db/connection');
const { calculateTimestamps } = require('../utils/calculateTimestamps');

// Display the Creat a Poll form

router.get('/', (req, res) => {
  //res.send('Here is a sample message on Create Poll page');

  res.render('create-poll');
});




module.exports = router;



