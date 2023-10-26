const db = require('../connection');

const getUsers = () => {
  return db.query (
    `
    SELECT * FROM users;
    `)
    .then(data => {
      return data.rows;
    })
    .catch (error => {
      console.error(`An error has occurred while attempting to retrieve user data:`, error);
      throw error;
    });
};

module.exports = { getUsers };
