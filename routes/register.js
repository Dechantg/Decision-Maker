


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



    res.render('register');
  } catch (error) {

    console.error('An error occurred:', error);

    res.status(500).send('Internal Server Error');
  }
});

router.post('/', async (req, res) => {
  try {
    console.log("Console.log of the button being clicked")

    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userExists(email);

    console.log(user);

    if (!user.email) {
      const userAdded = await addUser(email, firstName, lastName, hashedPassword);

      if (userAdded && userAdded.id && userAdded.email) {
        req.session.user = { id: userAdded.id, email: userAdded.email };
        res.redirect('polls');
      } else {
        res.status(500).send('Failed to add user');
      }
    };


    if (user.email && !user.signed_up) {
      const userUpdated = await addUser(email, firstName, lastName, hashedPassword);

      if (userAdded && userAdded.id && userAdded.email) {
        req.session.user = { id: userAdded.id, email: userAdded.email };
        res.redirect('polls');
      } else {
        res.status(500).send('Failed to add user');
      }
    };


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
