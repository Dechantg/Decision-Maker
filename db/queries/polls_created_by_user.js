const db = require('../connection');

const getPollsCreatedByUser = (user_id) => {
  return db.query (
    `

    `, [user_id])
    .then (data => {
      return data.rows;
    })
    .catch (error => {
      console.error(`An error has occurred while fetching the polls created by user:`, error);
      throw error;
    });
};


module.exports = getPollsCreatedByUser;
