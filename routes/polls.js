const express         = require('express');
const router          = express.Router();
const userIdbyEmail   = require('../db/queries/find_id_by_email');
const allAuthorized   = require('../db/queries/get_all_authorized');
const allOwned        = require('../db/queries/get_all_owned');
const bodyParser      = require('body-parser');

router.use(bodyParser.json());


router.get('/', async (req, res) => {
  try {
    // Fetch the user's email from cookies
    console.log("here is the cookie inform ation from inside the polls page", req.session.user)

    const userId = req.session.user.id
    const userEmail = req.session.user.email

    console.log("user email when no cookie", userEmail)
    console.log("here is the user id", userId)

    if (userEmail === undefined || userEmail === null) {
      console.log("this shows that the email was undefined and caught")
      res.send("Please sign in to view this page");
      return;
    }

    // Fetch the user's ID
    // const userId = await userIdbyEmail(userEmail);
    // const usersId = userId[0].id;

    // Fetch authorized and owned data
    const authorized = await allAuthorized(userId);
    const owned = await allOwned(userId);
            // res.json({ authorized, owned, userEmail, usersId  });

    res.render('poll-list', { authorized, owned, userEmail, userId });
  } catch (error) {

    console.error('An error occurred:', error);

    res.status(500).send('Internal Server Error');
  }
});




module.exports = router;
