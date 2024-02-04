

const express           = require('express');
const router            = express.Router();
const userEmailById     = require('../db/queries/find_user_by_email');
const uuid              = require('uuid');
const newUuid           = uuid.v4();

const pollExists        = require('../db/queries/does_poll_exist');
const pollDetails       = require('../db/queries/return_poll_details');


const db = require('../db/connection');




router.get('/:id', async (req, res) => {
  try {
    // Fetch the user's email from cookies
    // const userEmail = req.cookies.choiceMaker;
    // console.log("user email when no cookie", userEmail)
    const uuid = req.params.id

    let userEmail = null;

    const pollName = 'sample 1';
    const pollDescription = 'decriptioon 1';
    const options = [
        { option1: 'description1' },
        { option2: 'description2' },
        { option3: 'description3' }
      ];
    const emails = [ 'email1@here.com', 'email2@here.com', 'email3@here.com' ];
    const opensAt = '2024-02-05 12:01:00';
    const closesAt = '2024-02-06 12:01:00';

    const pollId = '53';



    const formData = {
      pollName,
      pollDescription,
      options: options.map(option => ({ ...option})),
      emails,
      opensAt,
      closesAt,
    };

    console.log("here is thge form data from the newly parsed cosnt: ", formData)

    if (req.session.user && req.session.user.email) {
      userEmail = req.session.user.email;
    }



    res.render('admin', {userEmail, formData, uuid, pollId});
  } catch (error) {

    console.error('An error occurred:', error);

    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
