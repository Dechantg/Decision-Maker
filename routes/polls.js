const express         = require('express');
const router          = express.Router();
const allAuthorized   = require('../db/queries/get_all_authorized');
const bodyParser      = require('body-parser');
const moment            = require('moment');


router.use(bodyParser.json());


router.get('/', async(req, res) => {
  try {

    const userId = req.session.user ? req.session.user.id : null;
    const userEmail = req.session.user ? req.session.user.email : null;

    const authorized = await allAuthorized(userId);

    const activeAuthorized = authorized.filter(item => item.poll_active);

    const inactiveAuthorized = authorized.filter(item => !item.poll_active);

    const formattedAuthorized = activeAuthorized.map((item) => ({
      ...item,
      opens_at: moment(item.opens_at).format('MMM DD, YYYY hh:mm A'),
      closes_at: moment(item.closes_at).format('MMM DD, YYYY hh:mm A'),
    }));

    const formattedInactiveAuthorized = inactiveAuthorized.map((item) => ({
      ...item,
      opens_at: moment(item.opens_at).format('MMM DD, YYYY hh:mm A'),
      closes_at: moment(item.closes_at).format('MMM DD, YYYY hh:mm A'),
    }));




    res.render('poll-list', { authorized: formattedAuthorized, formattedInactiveAuthorized, userEmail, userId });
  } catch (error) {

    console.error('An error occurred:', error);

    res.status(500).send('Internal Server Error');
  }
});




module.exports = router;
