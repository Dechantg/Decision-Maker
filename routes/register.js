


const express         = require('express');
const router          = express.Router();
const session         = require('express-session');
const bcrypt          = require('bcrypt');

const userQueries     = require('../db/queries/users');
const uuid            = require('uuid');

const userExists      = require('../db/queries/user_exists');
const updateUser      = require('../db/queries/update_user')
const addUser         = require('../db/queries/add_user')
const bodyParser      = require('body-parser');

router.use(bodyParser.json());


router.get('/', async (req, res) => {
  try {


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

    if (user.email && user.signed_up) {
      // User exists and has signed up
      const loginLink = '/';
  return res.status(200).send(`Account already exists. Please <a href="${loginLink}">login</a>.`);
    }

    if (!user.email) {
      const userAdded = await addUser(email, firstName, lastName, hashedPassword);
      console.log("the no email in database was triggered")

      if (userAdded && userAdded.id && userAdded.email) {
        req.session.user = { id: userAdded.id, email: userAdded.email };
        res.redirect('polls');
      } else {
        res.status(500).send('Failed to add user');
      }
    };


    if (user.email && !user.signed_up) {
      const userUpdated = await updateUser(email, firstName, lastName, hashedPassword);

      if (userUpdated && userUpdated.id && userUpdated.email) {
        req.session.user = { id: userUpdated.id, email: userUpdated.email };
        res.redirect('polls');
      } else {
        res.status(500).send('Failed to add user');
      }
    };


      console.log("user login information", req.session.user)


  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
