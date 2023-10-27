const express         = require('express');
const router          = express.Router();
const userQueries     = require('../db/queries/users');
const uuid            = require('uuid');
const pollExists      = require('../db/queries/does_poll_exist');
const getQuestions    = require('../db/queries/get_questions_for_poll');
const reisterVotes    = require('../db/queries/register_votes')
const pollDetails     = require('../db/queries/return_poll_details');
const addAnswer       = require('../db/queries/add_result_to_answers');
const hasVoted        = require('../db/queries/has_voted');
const changeStatus    = require('../db/queries/change_vote_status');
const userEmailById   = require('../db/queries/find_user_by_email');
const userIdbyEmail   = require('../db/queries/find_id_by_email');
const insertBorda     = require('../db/queries/insert_borda_results');
const userExists      = require('../db/queries/user_exists');
const getWinners      = require('../db/queries/get_winners');
const authorizedToVote = require('../db/queries/authorized_to_vote');
const allAuthorized   = require('../db/queries/get_all_authorized');
const allOwned        = require('../db/queries/get_all_owned');
const bodyParser      = require('body-parser');

router.use(bodyParser.json());


router.post('/', async (req, res) => {
  try {
    const userEmail = req.body.email;
    console.log('Button clicked!', req.body.email);

    const user = await userExists(userEmail);
    console.log(user);

    if (!user) {
      return res.status(403).json({ error: 'You are not authorized for this poll' });
    }

    if (user) {
      // Set the cookie
      res.cookie('choiceMaker', userEmail);
      console.log("Cookie set:", userEmail);
    }

    // Perform the redirect after the cookie is set
    res.redirect('/results');

  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).send('Internal Server Error');
  }
});



module.exports = router;
