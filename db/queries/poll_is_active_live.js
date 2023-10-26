const db = require('../connection');

const checkPollStatus = (poll_id) => {
  return db.query (
  `
  SELECT poll_active
  FROM polls
  WHERE id = $1;
  `, [poll_id])
    .then(data => {
      const checkPollStatus = data.rows;

      if (checkPollStatus.length > 0) {
        console.log(`Poll ${poll_id} is still open to voters.`);
        return checkPollStatus;
      } else {
        console.log(`The poll ${poll_id} does not exist or is already closed to voters.`, error);
        return null;
      }
    })
    .catch((error) => {
      console.error(`An error has occured while checking the status of this poll.`, error);
      return null;
    });
};

module.exports = checkPollStatus;
