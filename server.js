// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// app.use(cookieSession({
//   name: process.env.COOKIE_SESSION,
//   keys: provess.env.COOKIE_KEY
// }));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const mailgun = require('./routes/mailgun');
const uuid = require('uuid');
const newUuid = uuid.v4();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
})

// console.log('Generated UUID:', newUuid);

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('index');

  console.log('the sample index was just rendered')



});

app.get('/admin', (req, res) => {
  res.render('users');
  console.log('the users page was just rendered on route /admin')


});


app.get('/admin/:id', (req, res) => {
  const values = [req.params.id];
console.log('log for the id being passed in')

const queryString = `SELECT uuid
FROM polls
WHERE uuid = $1;
`

return pool
.query(queryString, values)
.then((result) => {
  console.log(result.rows[0]);
  return res.status(403).send("You have connected to a valid link from the database");
})
.catch((err) => {
  console.log(err.message);
});




// const adminPageIdQuery = function (page) {


  // }

  // console.log('the page was just rendered on route /admin:id')
  // return res.status(403).send("You have connected to a valid link from the database");


});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
