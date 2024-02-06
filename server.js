// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express        = require('express');
const morgan         = require('morgan');
const bodyParser     = require('body-parser');
const session        = require('express-session');

const PORT           = process.env.PORT || 8080;

const app            = express();


app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  name: 'Decision',
  cookie: {
    secure: false,
    sameSite: 'Lax',
  },
}));


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
const login             = require('./routes/login');
const register          = require('./routes/register');
const generatePoll      = require('./routes/generate-poll');
const logout            = require('./routes/logout');
const updatePoll        = require('./routes/admin-update');
const deletePoll        = require('./routes/delete-poll');
const admin             = require('./routes/admin');
const pollActive        = require('./routes/active-switch');




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
app.use('/login', login);
app.use('/register', register);
app.use('/create/generate', generatePoll);
app.use('/update', updatePoll);
app.use('/logout', logout);
app.use('/admin', admin);
app.use('/delete', deletePoll);
app.use('/active', pollActive);



// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', async (req, res) => {
  try {
    let userEmail = null;

    if (req.session.user && req.session.user.email) {
      userEmail = req.session.user.email;
    }

    res.render('index', { userEmail });
    // console.log('The sample index was just rendered');
  } catch (error) {
    console.error('An error has occurred:', error);
  }
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
