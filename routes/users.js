/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();



// random generator function used to create the TinyURLs
const generateRandomString = (length) => Math.random().toString(36).substring(2, (length + 2)); // generates a random 6 character string
//


// HOME - GET - route handler for the root path '/'
router.get('/', (req, res) => {
  res.render('users');
});


/*

//  READ ----   HTTP       CRUD   ----   HTTP

// BROWSE       GET         CREATE      POST
// READ         GET         READ        GET
// EDIT         PUT         UPDATE      PUT
// ADD          PUT         DELETE      DELETE
// DELETE       DELETE


// HOME - POST

// GET
// POST -- Create a POLL URL

// GET
// POST -- Editing an 

// GET
// POST

// GET
// POST

// GET
// POST

// GET
// POST

// GET
// POST



*/











module.exports = router;
