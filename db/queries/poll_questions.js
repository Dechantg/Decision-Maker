const db = require('../connection');

const getPollOptions = (poll_id) => {
  return db.query (
    `
    SELECT poll_id, title, description
    FROM decision_poll_options
    WHERE poll_id = $1;
    `, [poll_id])
    .then(data => {
      return data.rows;
    })
    .catch (error => {
      console.error(`An error has occurred while attempting to retrieve the poll options:`, error);
      throw error;
    });
};

module.exports = getPollOptions;
