

const db = require('../connection');

const userDataById = (id) => {
  return db.query (
  `
  SELECT email, first_name, last_name
  FROM decision_users
  WHERE id = $1;
  `, [id])
    .then(data => {
      const userDetails = data.rows[0];
      return userDetails;
    })
    .catch (error => {
      console.error(`An error has occured while trying to retrieve the email for user ${id}.`, error);
      throw error;
    });
};

module.exports = userDataById;
