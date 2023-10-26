const express     = require('express');
const router      = express.Router();
const uuid              = require('uuid');
const newUuid           = uuid.v4();

const db = require('../db/connection');

// const { Pool }          = require('pg');

// const pool = new Pool({
//   user:     process.env.DB_USER,
//   password: process.env.DB_PASS,
//   host:     process.env.DB_HOST,
//   database: process.env.DB_NAME,
// });



router.get('/', (req, res) => {

  res.send('Here is a sample message on Create Poll page');
  // res.render('create-poll');
  const uuid = newUuid;
  console.log('The users page was just rendered on route /create');
  console.log('I have created a new uuid for you', uuid);




  // return pool
  // .query(queryString, values)
  // .then((result) => {
  //   console.log(result.rows[0]);
  //   res.send(`here is the sample results ${result.rows[0]}`);

  // })
  // .catch((err) => {
  //   console.log(err.message);
  // });

});


module.exports = router;



