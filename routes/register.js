
const express         = require('express');
const router          = express.Router();
const bcrypt          = require('bcrypt');
const userExists      = require('../db/queries/user_exists');
const updateUser      = require('../db/queries/update_user')
const addUser         = require('../db/queries/add_user')
const bodyParser      = require('body-parser');

router.use(bodyParser.json());


router.get('/', async (req, res) => {
  try {
    const userId = req.session.user ? req.session.user.id : null;
    const userEmail = req.session.user ? req.session.user.email : null;

    if (!userEmail) {
      return res.render('register', { userEmail });
    }

    res.render('register');
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/', async (req, res) => {
  try {

    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await userExists(email);



    if (!user) {
      const userAdded = await addUser(email, firstName, lastName, hashedPassword);
      console.log("the no email in database was triggered");

      if (userAdded && userAdded.id && userAdded.email) {
        req.session.user = { id: userAdded.id, email: userAdded.email };
        return res.redirect('polls');
      } else {
        res.status(500).send('Failed to add user');
      }
    };

    if (user.email && user.signed_up) {
      // User exists and has signed up
      const loginLink = '/';
  return res.status(200).send(`Account already exists. Please <a href="${loginLink}">login</a>.`);
    }



    if (user.email && !user.signed_up) {
      const userUpdated = await updateUser(email, firstName, lastName, hashedPassword);

      if (userUpdated && userUpdated.id && userUpdated.email) {
        req.session.user = { id: userUpdated.id, email: userUpdated.email };
        return res.redirect('polls');
      } else {
        res.status(500).send('Failed to add user');
      }
    };

  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
