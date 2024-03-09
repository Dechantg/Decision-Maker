const db = require('../connection');

const authorizedToVote = (user_id, poll_id) => {
  return db.query (
  `
  SELECT user_id, poll_id
  FROM decision_authorized_to_vote
  WHERE user_id = $1 AND poll_id = $2;
  `, [user_id, poll_id])
    .then(data => {
      const isAuthorized = data.rows.length > 0;
      console.log(`User ${user_id} is authorized to vote in poll ${poll_id}: ${isAuthorized}`);
      return isAuthorized;
    })
    .catch (error => {
      console.error(`An error has occurred while checking authorization for user ${user_id} in poll ${poll_id}:`, error);
      throw error;
    });
};

module.exports = authorizedToVote;
