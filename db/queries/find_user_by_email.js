const db = require('../connection');

const userEmailById = (id) => {
  return db.query (
  `
  SELECT email
  FROM users
  WHERE id = $1;
  `, [id])
    .then(data => {
      const pollDetails = data.rows;
      return pollDetails;
    })
    .catch (error => {
      console.error(`An error has occured while trying to retrieve the email for user ${id}.`, error);
      throw error;
    });
};

module.exports = userEmailById;
