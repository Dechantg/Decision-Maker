

const db = require('../connection');

const findIdByEmail = (email) => {
  return db.query (
  `
  SELECT id
  FROM decision_users
  WHERE email = $1;
  `, [email])
    .then(data => {
      const pollDetails = data.rows;
      return pollDetails;
    })
    .catch (error => {
      console.error(`An error has occured while trying to retrieve the email for user ${id}.`, error);
      throw error;
    });
};

module.exports = findIdByEmail;
