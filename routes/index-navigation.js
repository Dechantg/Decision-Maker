const express     = require('express');
const router      = express.Router();
const uuid        = require('uuid');
const newUuid     = uuid.v4();

const db          = require('../db/connection');

const validation  = require('../utils/isVoterIsAdminValidation.js');

// Only authorized Voters and/or Admins can view Results Page
router.post('/poll-results', (req, res) => { // CHECK THIS PATHWAY
  const emailUuid = req.body.emailUuid; // CHECK THIS PATHWAY

  if (validation.isValidVoter(emailUuid)) { // CHECK THIS PATHWAY
    res.redirect('/poll-results');
  } else {
    res.status(400).send(`Invalid Email/UUID`);
  }
});

// Onlly authorized Admins can view Admin Page
router.post('/admin-page', (req, res) => { // CHECK THIS PATHWAY
  const emailUuid = req.body.emailUuid; // CHECK THIS PATHWAY

  if (validation.isValidAdmin(emailUuid)) { // CHECK THIS PATHWAY
    res.redirect('/admin-page');
    } else {
      res.status(400).send(`Invalid Email/UUID`);
    }
});

module.exports = router;
