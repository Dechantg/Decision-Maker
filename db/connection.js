

// PG database client/connection setup
const { Pool } = require('pg');

const dbParams = {
  user: process.env.ELEPHANT_USER,
  host: process.env.ELEPHANT_HOST,
  database: process.env.ELEPHANT_USER,
  password: process.env.ELEPHANT_PASSWORD,
  port: 5432
};

const db = new Pool(dbParams);

db.connect();

module.exports = db;
