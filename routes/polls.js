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
    const userEmail = req.cookies.choiceMaker;
    console.log("user email when no cookie", userEmail)

    if (userEmail === undefined || userEmail === null) {
      console.log("this shows that the email was undefined and caught")
      res.send("Please sign in to view this page");
      return;
    }

    // Fetch the user's ID
    const userId = await userIdbyEmail(userEmail);
    const usersId = userId[0].id;

    // Fetch authorized and owned data
    const authorized = await allAuthorized(usersId);
    const owned = await allOwned(usersId);
            // res.json({ authorized, owned, userEmail, usersId  });

    res.render('poll-list', { authorized, owned, userEmail, usersId });
  } catch (error) {

    console.error('An error occurred:', error);

    res.status(500).send('Internal Server Error');
  }
});




module.exports = router;
