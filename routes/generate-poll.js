
const router = require("express").Router();
// const express     = require('express');
// const router      = express.Router();
const uuid        = require('uuid');
const newUuid     = uuid.v4();


const db = require('../db/connection');
const { calculateTimestamps } = require('../utils/calculateTimestamps');



router.post('/', (req, res) => {
  try {
    const formData = req.body;
    console.log('Received data:', formData);


    res.send('Data received successfully!');
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
