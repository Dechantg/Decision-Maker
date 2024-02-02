// load .env data into process.env
require('dotenv').config();

// Web server config
const cookieSession  = require('cookie-session');

const sassMiddleware = require('./lib/sass-middleware');
const express        = require('express');
const morgan         = require('morgan');
const cookieParser   = require('cookie-parser');
const bodyParser     = require('body-parser');

const PORT           = process.env.PORT || 8080;

const app            = express();


app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);

app.use(cookieSession({
  name: 'session',
  keys: process.env.COOKIE_KEY
}));

app.use(cookieParser())

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes     = require('./routes/users-api');
const usersRoutes       = require('./routes/users');
const widgetApiRoutes   = require('./routes/widgets-api');
const createPoll        = require('./routes/create-poll');
const mailgun           = require('./routes/mailgun');
const pollResults       = require('./routes/poll-results');
const submitPolls       = require('./routes/submit-poll');
const refreshEmail      = require('./routes/refreshEmail');
const pollsList         = require('./routes/polls');
const loginRegister     = require('./routes/login-register');
const generatePoll      = require('./routes/generate-poll');

// const admin         = require('./routes/admin-page');

// const adminPage         = require('./routes/admin-page');


// const adminPage         = require('./routes/admin-page');

const uuid              = require('uuid');
const newUuid           = uuid.v4();

const { Pool }          = require('pg');
const registerVotes = require('./db/queries/register_votes');

const pool = new Pool({
  user:     process.env.DB_USER,
  password: process.env.DB_PASS,
  host:     process.env.DB_HOST,
  database: process.env.DB_NAME,
});

// console.log('Generated UUID:', newUuid);

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`


app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/create', createPoll);
app.use('/vote', submitPolls);
app.use('/results', pollResults);
app.use('/refresh', refreshEmail);
app.use('/polls', pollsList);
app.use('/login', loginRegister);
app.use('/create/generate', generatePoll);
// app.use('/admin-page', admin);


// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('index');
  console.log('the sample index was just rendered');
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
