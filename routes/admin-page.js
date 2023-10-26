const express           = require('express');
const router            = express.Router();
const userEmailById = require('../db/queries/findUserById');
const uuid              = require('uuid');
const newUuid           = uuid.v4();
const { Pool }          = require('pg');

const pool = new Pool({
  user:     process.env.DB_USER,
  password: process.env.DB_PASS,
  host:     process.env.DB_HOST,
  database: process.env.DB_NAME,
});

router.post('/')

//
router.get('/:id', (req, res) => {
  const values = [req.params.id];
  console.log('log for the id being passed in', values);

  const queryString = `
  SELECT uuid
  FROM polls
  WHERE uuid = $1;
  `;

  return pool
    .query(queryString, values)
    .then((result) => {
      console.log(result.rows[0]);
      return res.status(403).send("You have connected to a valid link from the database");
    })
    .catch((err) => {
      console.log(err.message);
    });

});

// Display the current (live) poll in descending order of vote counts
router.get('/ENTER PATH HERE (POLL OPTIONS)', (req, res) => {
  res.send('Here is a sample message on Admin page');
  // res.render('users');

  const selectPollOptionQuery = `
  SELECT option_text, votes
  FROM poll_options
  ORDER BY votes DESC;
  `;

  pool.query(selectPollOptionQuery, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send("Unable to retrieve current poll options");
    } else {
      res.status(200).send('Poll expiry extended successfully');
      // res.send('admin-page', { pollOptions: result.rows });
      // res.render('admint-page', { pollOptions: result.rows });
    }
  });

  console.log('the users page was just rendered on route /admin');
});

// Invite/Add new voter to the poll while it is active
router.post('/ENTER PATH HERE (INVITE/ADD NEW VOTER)', (req, res) => {
  const { user_id, poll_id } = req.body;

  if (!Number.isInteger(user_id) || !Number.isInteger(poll_id)) {
    return res.status(400).send('Invalid User/Poll ID');
  }

  const insertNewUserIntoAuthorizedVoteQuery = `
  INSERT INTO autorized_to_vote (user_id, poll_id)
  VALUES ($1, $2)
  RETURNING id;
  `;

  pool.query(insertNewUserIntoAuthorizedVoteQuery, [user_id, poll_id], (error) => {
    if (error) {
      console.error(error);
      res.status(500).send('Failed to add new voter for the current active poll');
    } else {
      res.status(200).send(`Additional voter ${result.rows[0].id} is now authorized to vote`);
    }
  });

});

// Display the time remaining on live poll
router.get('/ENTER PATH HERE (TIME REMAINING)', (req, res) => {
  const pollId = req.query.pollId;
  const selectTimeRemainingQuery = `
  SELECT EXACT (EPOCH FROM (closes_at - NOW())) AS time_remaining
  FROM polls
  WHERE id = $1;
  `;

  pool.query(selectTimeRemainingQuery, [pollId], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send('Failed to obtain reamining time information');
    } else {
      res.status(200).send('Time remaining is: ');
    }
  });

});

// Display if the current poll is live/active
router.get('/ENTER PATH HERE (POLL STATUS - LIVE/ACTIVE', (req, res) => {
  const pollId = req.query.pollId;
  const checkPollStatusQuery = `
  SELECT poll_active
  FROM polls
  WHERE id = $1;
  `;

  pool.query(checkPollStatusQuery, [pollId], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error determining polls current status');
    } else {
      const isPollActive = result.rows[0].poll_active;

      if (isPollActive) {
        res.status(200).send('Poll is currently Live and Active');
      } else {
        res.status(200).send('Poll is currently Inactive');
      }
    }
  });

});

// End the current poll (immediately)
router.put('/ENTER PATH HERE (END POLL)', (req, res) => {
  const pollId = req.body.pollId;

  if (!Number.isInteger(poll_id)) {
    return res.status(400).send('Invalid Poll ID');
  }

  const endPollEarlyQuery = `
  UPDATE polls
  SET closes_at = NOW()
  WHERE id = $1;
  `;

  pool.query(endPollEarlyQuery, [pollId], (error) => {
    if (error) {
      console.error(error);
      res.status(500).send('Failed to end poll early');
    } else {
      res.status(200).send('Poll ended early');
    }
  });

});

// Delete the current (live) poll entirely
router.delete('/ENTER PATH HERE (DELETE POLL)', (req, res) => {
  const pollId = req.body.pollId;
  const deletePollQuery = `
  DELETE FROM polls
  WHERE id = $1;
  `;

  pool.query(deletePollQuery, [pollId], (error) => {
    if (error) {
    console.error(error);
    res.status(500).send('Failed to delete poll');
    } else {
      res.status(200).send('Poll deleted');
    }
  });

});

// Display a hyperlinked button to 'Create Poll' page
router.get('ENTER PATH HERE (CREATE POLL LINK)', (req, res) => {
  res.send('<a href="/create-poll">Create a new Poll</a>');
  // res.render('admin-page OR create-poll?');
});




module.exports = router;




