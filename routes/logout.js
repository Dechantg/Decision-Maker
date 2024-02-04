
const express         = require('express');
const router          = express.Router();
const session         = require('express-session');






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
