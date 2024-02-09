const express         = require('express');
const router          = express.Router();
const allAuthorized   = require('../db/queries/get_all_authorized');
const bodyParser      = require('body-parser');
const convertToLocal  = require('../public/scripts/convertToLocal');


router.use(bodyParser.json());


router.get('/', async(req, res) => {
  try {

    const userId = req.session.user ? req.session.user.id : null;
    const userEmail = req.session.user ? req.session.user.email : null;
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log(`User's Timezone: ${userTimeZone}`);


    const authorized = await allAuthorized(userId);

    const activeAuthorized = authorized.filter(item => item.poll_active);

    const inactiveAuthorized = authorized.filter(item => !item.poll_active);


    const formattedAuthorized = await convertToLocal(activeAuthorized, userTimeZone);

    console.log("here is my formattedAuthorized from polls", formattedAuthorized)

    const formattedInactiveAuthorized = await convertToLocal(inactiveAuthorized, userTimeZone);








    res.render('poll-list', { authorized: formattedAuthorized, formattedInactiveAuthorized, userEmail, userId });
  } catch (error) {

    console.error('An error occurred:', error);

    res.status(500).send('Internal Server Error');
  }
});




module.exports = router;
