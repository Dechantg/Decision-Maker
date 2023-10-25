/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

//  READ ----   HTTP       CRUD   ----   HTTP

// BROWSE       GET         CREATE      POST
// READ         GET         READ        GET
// EDIT         PUT         UPDATE      PUT
// ADD          PUT         DELETE      DELETE
// DELETE       DELETE

const express = require('express');
const router  = express.Router();


// random generator function used to create the TinyURLs
const generateRandomString = (length) => Math.random().toString(36).substring(2, (length + 2)); // generates a random 6 character string
//


/*
// Home Page (/)

- contains textbox to enter email to check on polls
- issues encrypted cookie based on user_id and/or email
// --------------------

// GET - route handler for the root path '/'
router.get("/", (req, res) => {
  res.render('users');
});

// POST
router.post("/", (req, res) => {

});
*/

// ==============================================================================

/*
// Poll Creation Page (/poll/create)

- Creator email
- Creator name

- Poll title
  - Poll Description

- Options (3 empty spaces to start)
  - Option Title
  - short option description
  - button to add addition options
  - each option has ability for poll create to register their vote at creation

- People who can vote section/ invites (intial 5 people)
  - ~~First, Last name entry of people eligable to vote~~
  - email of people eligable to vote
  - add additonal voter button

- Clicking submit posts form data to database and redirects to poll list page
  - send out invite emails to add eligable voters
  - emails creator link to poll page and admin page
  - ~~creates unique id based on 6 character generator (tinyapp style)~~

// ------------------------
// GET ("/poll/create") -- displays the "Create New Poll" page

app.get("/poll/create" , (req, res) => {
});

// POST ("/poll/:id") -- editing a created poll

app.post("/poll/:id", (req, res) => {
});
*/

// ==============================================================================

/*
// Poll viewing Page (/home/:id)

- based on email(cookie) contains list of polls eligable to control - links to polls
  - link redirects to localhost:8080/admin/:id

- base on email(cookie) contains list of polls eligable to vote on - links to polls
  - link redirects to localhost:8080/vote/:id
// ------------------------------------------

// GET ("/home/:id") -- displays poll by id link
app.get("/home/id", (req, res) => {

});

// POST ("/home/:id") -- displays details of specific URL -- shared link by admin
app.post("/home/:id", (req, res) => {

});
*/

// ==============================================================================

/*
// poll voting page (/vote/:id)

- contains list of options (title and description)
  - edgecase - ability to see/navigate to other polls theyre invited/apart of (that are active)

- contains title of poll

- contains description of poll

- contains name of creator of poll

- contains input for name and email of voter to validate against list of eligable voters
  - if valid session cookie exists it shows name and user of voter automatically

- contains container for registering vote
  - stretch ideal is a drag and drop of numbers 1, 2, 3
  - maybe a clickable selection table like so       3 2 1  (3 > 1)
                                                    o o o

- If user has already voted it displays their selected options/choices

- button to submit users votes registers selections in database and refreshes page to reflect
  - notifys the admin of a vote being cast
  - (stretch second column that shows current top three but only after user has registered their votes)
  - runs calculation of poll from database from all submitted choices linked to that poll and pushes updated results into polls database

- link to return to list of polls user is involved in
// ----------------------------------

// GET("/vote/:id) -- gets poll from database


// POST (/vote/:id) -- submit votes to user_choices
app.post("/poll/:id", (req,res) => {

  const queryString = function() {
    INSERT INTO user_choices (selection_made)
    VALUES ($1); //note will need to be inserted based on FK's

  }

});
*/

// ==============================================================================

/*
// poll admin page (/admin/:id)

- shows title and description of poll
  - shows list of options

- shows time remaining on poll

- shows number of users who have voted

- shows current results talley

- when applicable shows final result
// --------------------

// GET ("/admin/:id") -- displays
// POST

*/















module.exports = router;
