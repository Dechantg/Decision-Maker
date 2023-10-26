const express     = require('express');
const router      = express.Router();
const uuid        = require('uuid');
const newUuid     = uuid.v4();

const db = require('../db/connection');

// Display the Creat a Poll form
router.get('/ENTER PATH HERE (CREATE-POLL)', (req, res) => {
  res.send('Here is a sample message on Create Poll page');
  // res.render('create-poll');
});

// Adding users to the 'Recipients' list (authorized voters)
router.post('/ENTER PATH HERE (ADD-USERS)', (req, res) => {

  const { email } = req.body;

  if (!email) {
    console.log('Email does not already exist, added to database of authorized voters/users successfully');
    return;
  } else {
    res.status(400).send(`Email is already associated to an authorized user/voter.`);
  }

  const voterEmailAddedToAuthorizedRecipientsQuery = `
  INSERT INTO authorized_to_vote (user_email)
  VALUES ($1)`;

  db.query (voterEmailAddedToAuthorizedRecipientsQuery, [email], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send(`Error registering email as an authorized voter:`);
    } else {
      res.status(200).send(`${email} successfully added to the list of authorized voters.`);
    }
  });
});

// Submitting the Create a Poll form
router.post(`/ENTER PATH HERE (SUBMIT/CREATE-POLL)`, (req, res) => {

  const { pollName, option, pollDescription, days, hours, minutes } = req.body;

  const { opens_at, closes_at } = calculateTimestamps(days, hours, minutes);

  const pollUuid = newUuid;

  const pollCreatedQuery = `
  INSERT INTO polls (uuid, poll_creator_id, poll_name, poll_description, created_at, opens_at, closes_at, poll_active)
  VALUES ($1, $2, $3, $4, NOW(), $5, %6, TRUE)
  RETURNING id;
  `;

  const addPollRecipientsQuery = `
  INSERT INTO authorized_to_vote (user_email)
  VALUES ($1);
  `;

  const createOptionsQuery = `
  INSERT INTO poll_options (poll_id, title, description)
  VALUES ($1, $2, $3);
  `;

  db.query('BEGIN', (beginError) => {
    if (beginError) {
        console.error(`Error loading Create a Poll form:`, beginError);
        res.status(500).send(`Server error`)
        return;
      }

    db.query(pollCreatedQuery, [pollUuid, req.user.id, pollName, pollDescription, opens_at, closes_at], (pollError, pollResult) => {
      if (pollError) {
        console.error(`Error generating pollL`, pollError);
        res.status(500).send(`Server error`);
      }

      const pollId = pollResult.rows[0].id;
      const recipientEmails = recipients.split(',');


      const recipientsPromises = recipientEmails.map((email) => {
        db.query(addPollRecipientsQuery, [email], (recipientError) => {
          if (recipientError) {
            console.error(`Error adding recipients emails:`, recipientError);
            return db.query('ROLLBACK', () => {
              res.status(500).send(`Server error`);
            });
          }
        });
      });

      options.forEach((option) => {
        const { title, description } = option;
        db.query(createOptionsQuery, [pollId, title, description], (optionError) => {
          if (optionError) {
            console.error(`Error including options:`, optionError);
            return db.query('ROLLBACK', () => {
              res.status(500).send(`Server error`);
            });
          }
        });
      });

      db.query('COMMIT', (commitError) => {
        if (commitError) {
          console.error(`Error creating the poll:`, commitError);
          res.status(500).send(`Server error`);
        } else {
          console.log(`Poll created successfully`);
          res.status(200).send(`Your poll has been created and is now active!`)
        }
      });
    });
  });
});

module.exports = router;



