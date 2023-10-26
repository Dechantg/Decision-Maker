const db = require('../connection');

const endPollEarly = (poll_id) => {
return db.query (
  `
  UPDATE polls
  SET closes_at = NOW()
  WHERE id = $1;
  `, [poll_id])
    .then(() => {
      console.log(`Poll ID ${poll_id} has ended early.`);
      return;
    })
    .catch (error => {
      console.error(`An error has occurred while attempting to end poll ID ${poll_id} early.`, error);
      throw error;
    });
};

module.exports = endPollEarly;
