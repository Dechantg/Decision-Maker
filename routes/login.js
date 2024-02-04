

const express         = require('express');
const router          = express.Router();
const session         = require('express-session');
const bcrypt          = require('bcrypt');

const userQueries     = require('../db/queries/users');
const uuid            = require('uuid');

const userExists      = require('../db/queries/user_exists');

const addUser         = require('../db/queries/add_user')
const bodyParser      = require('body-parser');

router.use(bodyParser.json());


router.get('/', async (req, res) => {
  try {
    // Fetch the user's email from cookies
    // const userEmail = req.cookies.choiceMaker;
    // console.log("user email when no cookie", userEmail)



    res.render('login');
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

    const { email, password } = req.body;

    const user = await userExists(email);
    console.log(user);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.signed_up) {
      const loginLink = '/register';
  return res.status(200).send(`Account must still be registered. Please <a href="${loginLink}">register</a>.`);
    }

    const hashedPasswordFromDB = user.password_hash;


    if (bcrypt.compareSync(password, hashedPasswordFromDB)) {

      // Set the user information in the session
      req.session.user = { id: user.id, email: user.email };

      console.log("user login information", req.session.user)

    }

    // else {
    //   const newEmail = await addUser(userEmail);
    //   req.session.user = { email: newEmail }; // Adjust the session user object as needed
    // }

    res.redirect('polls');
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
