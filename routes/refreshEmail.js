const express         = require('express');
const router          = express.Router();

const userExists      = require('../db/queries/user_exists');

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
    res.redirect('/polls');

  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).send('Internal Server Error');
  }
});



module.exports = router;
