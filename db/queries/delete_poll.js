const db = require('../connection');

const deletePoll = (poll_id) => {
  return db.query (
  `
  DELETE FROM polls
  WHERE id = $1;
  `, [poll_id])
  .then(() => {
    console.log(`Poll ID ${poll_id} has been deleted.`);
    return;
  })
  .catch (error => {
    console.error(`An error has occurred while attempting to delete poll ID ${poll_id}`);
    throw error;
  });
};

module.exports = deletePoll;
