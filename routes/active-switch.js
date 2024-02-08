const express           = require('express');
const router            = express.Router();
const bodyParser        = require('body-parser');
const changeStatus      = require('../db/queries/change_poll_status');

router.use(bodyParser.json());


router.post('/:pollId', async(req, res) => {
  try {
    const pollId = req.params.pollId;
    const pollStatus = req.body.pollActive === 'true';
    const invertedPollStatus = !pollStatus;
    const userId = req.session.user ? req.session.user.id : null;

    await changeStatus(pollId, userId, invertedPollStatus);




    res.json({ message: 'Data received successfully!' });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

