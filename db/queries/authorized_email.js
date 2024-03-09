const db = require('../connection');

const authorizedEmail = (poll_id) => {
  return db.query (
  `
  SELECT decision_users.email, decision_users.id
  FROM decision_authorized_to_vote
  JOIN decision_users ON decision_users.id = user_id
  WHERE poll_id = $1;
  `, [poll_id])
    .then(data => {
      return data.rows;
    }).catch (error => {
      console.error(`An error has occurred while checking authorization for user ${user_id}`, error);
      throw error;
    });
};

module.exports = authorizedEmail;
