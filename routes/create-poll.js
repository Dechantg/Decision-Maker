
const express     = require('express');
const router      = express.Router();
const uuid        = require('uuid');
const newUuid     = uuid.v4();

const db = require('../db/connection');
const { calculateTimestamps } = require('../utils/calculateTimestamps');

// Display the Creat a Poll form

router.get('/', async (req, res) => {

  try {
    let userEmail = null;

    if (req.session.user && req.session.user.email) {
      userEmail = req.session.user.email;
    }
    res.render('create-poll', { userEmail });
    console.log('The sample index was just rendered');
  } catch (error) {
    console.error('An error has occurred:', error);
  }
});




module.exports = router;



