const express         = require('express');
const router          = express.Router();
const allAuthorized   = require('../db/queries/get_all_authorized');
const allOwned        = require('../db/queries/get_all_owned');
const bodyParser      = require('body-parser');
const moment            = require('moment');


router.use(bodyParser.json());


router.get('/', async (req, res) => {
  try {

    const userId = req.session.user ? req.session.user.id : null;
    const userEmail = req.session.user ? req.session.user.email : null;


    if (userEmail === undefined || userEmail === null) {
      console.log("this shows that the email was undefined and caught")
      res.send("Please sign in to view this page");
      return;
    }



    const authorized = await allAuthorized(userId);
    const owned = await allOwned(userId);

    const formattedAuthorized = authorized.map((item) => ({
      ...item,
      created_at: moment(item.created_at).format('MMM DD, YYYY hh:mm A'),
      closes_at: moment(item.closes_at).format('MMM DD, YYYY hh:mm A'),
    }));

    const formattedOwned = owned.map((poll) => ({
      ...poll,
      created_at: moment(poll.created_at).format('MMM DD, YYYY hh:mm A'),
      closes_at: moment(poll.closes_at).format('MMM DD, YYYY hh:mm A'),
    }));

    res.render('poll-list', { authorized: formattedAuthorized, owned: formattedOwned, userEmail, userId });
  } catch (error) {

    console.error('An error occurred:', error);

    res.status(500).send('Internal Server Error');
  }
});




module.exports = router;
