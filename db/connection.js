
// PG database client/connection setup
const { Pool } = require('pg');

const dbParams = {
  user: process.env.ELEPHANT_USER,
  host: process.env.ELEPHANT_HOST,
  database: process.env.ELEPHANT_USER,
  password: process.env.ELEPHANT_PASSWORD,
  port: 5432

  // user: process.env.DB_USER,
  // host: process.env.DB_HOST,
  // database: process.env.DB_NAME,
  // password: process.env.DB_PASSWORD,
  // port: process.env.DB_PORT

};

const db = new Pool(dbParams);

db.connect();

module.exports = db;
