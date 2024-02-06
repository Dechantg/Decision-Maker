
const express     = require('express');
const router      = express.Router();
const uuid        = require('uuid');
const newUuid     = uuid.v4();

const db = require('../db/connection');
const { calculateTimestamps } = require('../utils/calculateTimestamps');


router.get('/', async (req, res) => {

  try {
    const userId = req.session.user ? req.session.user.id : null;
    const userEmail = req.session.user ? req.session.user.email : null;

  
    res.render('create-poll', { userEmail });
    console.log('The sample index was just rendered');
  } catch (error) {
    console.error('An error has occurred:', error);
  }
});




module.exports = router;



