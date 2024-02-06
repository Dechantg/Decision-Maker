


const express           = require('express');
const router            = express.Router();
const bodyParser      = require('body-parser');
const deletePoll        = require('../db/queries/delete_poll');


const db = require('../db/connection');

router.use(bodyParser.json());



router.post('/:pollId', async (req, res) => {
  try {

    const pollId = req.params.pollId;
    const uuid = req.body.uuid;
    const userId = req.session.user ? req.session.user.id : null;
    const userEmail = req.session.user ? req.session.user.email : null;

    const pollStatus = req.body.pollDeleted === 'true';
    const invertedPollStatus = !pollStatus;
    // const userId = '1';


    console.log("is the coming from inside my delete poll?", invertedPollStatus)



    const pollMarkedDeleted = await deletePoll(pollId, userId, invertedPollStatus);

    console.log("here is from inside my delete post query return: ", pollMarkedDeleted);



    res.json({ message: 'Data received successfully!' });

  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;

