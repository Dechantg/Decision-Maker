const express     = require('express');
const router      = express.Router();
const userQueries = require('../db/queries/users');
const uuid              = require('uuid');
const newUuid           = uuid.v4();
const { Pool }          = require('pg');

const pool = new Pool({
  user:     process.env.DB_USER,
  password: process.env.DB_PASS,
  host:     process.env.DB_HOST,
  database: process.env.DB_NAME,
});


router.get('/', (req, res) => {
  res.render('poll-results');

});


router.get('/voting/:id', (req, res) => {
  const values = [req.params.id];
  console.log('log for the id being passed in for the voting link');


  return pool
    .query(queryString, values)
    .then((result) => {
      console.log(result.rows[0]);
      return res.render('submit-poll');

    })
    .catch((err) => {
      console.log(err.message);
    });
});

module.exports = router;
