

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
const addUser         = require('../db/queries/add_user')
const bodyParser      = require('body-parser');

router.use(bodyParser.json());


router.get('/', async (req, res) => {
  try {
    // Fetch the user's email from cookies
    // const userEmail = req.cookies.choiceMaker;
    // console.log("user email when no cookie", userEmail)



    res.render('login-register');
  } catch (error) {

    console.error('An error occurred:', error);

    res.status(500).send('Internal Server Error');
  }
});

router.post('/', async (req, res) => {
  try {
    // Fetch the user's email from cookies
    // const userEmail = req.cookies.choiceMaker;
    console.log("Console.log of the button being clicked")
    // res.send("the button was clicked")

    const userEmail = req.body.email;

    const user = await userExists(userEmail);
    console.log(user);

      if (user) {
      // req.session.usersEmail = userEmail;
      res.clearCookie('choiceMaker');
      res.cookie('choiceMaker', userEmail);
      console.log("cookie checking the if user fucntion", userEmail)
        }

      if (!user) {

        const newEmail = await addUser(userEmail)
        console.log("here is a responce from trying to add a new ueser to my database", newEmail)
        res.clearCookie('choiceMaker');
        res.cookie('choiceMaker', userEmail);

            // res.send("email was added")



      }





    res.redirect('polls');
  } catch (error) {

    console.error('An error occurred:', error);

    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
