

const express           = require('express');
const router          = express.Router();

const uploadDatabase = require('../db/queries/upload_database')

const bodyParser      = require('body-parser');


router.use(bodyParser.json());


router.get('/', async(req, res) => {
  try {

    uploadDatabase();




    res.render('login');
  } catch (error) {

    console.error('An error occurred:', error);

    res.status(500).send('Internal Server Error');
  }
});




module.exports = router;

