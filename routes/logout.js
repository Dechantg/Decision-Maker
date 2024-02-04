
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


router.post('/', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    } else {
      res.redirect('/');
    }
  });
});


module.exports = router;
