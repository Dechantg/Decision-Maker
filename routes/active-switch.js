




const express           = require('express');
const router            = express.Router();
const bodyParser        = require('body-parser');
const allAuthorized   = require('../db/queries/get_all_authorized');
const allOwned        = require('../db/queries/get_all_owned');
const changeStatus      = require('../db/queries/change_poll_status');


const db = require('../db/connection');

router.use(bodyParser.json());


router.post('/:pollId', async (req, res) => {
  try {
    const pollId = req.params.pollId;
    const uuid = req.body.uuid;
    const pollStatus = req.body.pollActive === 'true';
    const invertedPollStatus = !pollStatus;
    const userId = req.session.user ? req.session.user.id : null;
    const userEmail = req.session.user ? req.session.user.email : null;


    console.log("from inside the switch ehre is  poll id number", pollId);



    console.log("is status the coming from inside my switch?", invertedPollStatus)



    const pollStatusChanged = await changeStatus(pollId, userId, invertedPollStatus);

    console.log("here is from inside my active status post query return: ", pollStatusChanged);



    res.json({ message: 'Data received successfully!' });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

