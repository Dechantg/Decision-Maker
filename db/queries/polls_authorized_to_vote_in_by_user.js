const db = require('../connection');

const getPollsAuthorizedToVoteByUser = (user_id) => {
  db.query (
    `
    SELECT decision_polls.id AS poll_id,
    decision_users.id AS user_id,
    decision_authorized_to_vote.user_id AS authorized,
    decision_users.email AS user,
           poll_name AS Name,
           poll_description AS description,
           poll_active AS status,
           result_winner AS winner,
           result_runner_up AS runner_up,
           result_third_choice AS third_choice,
           uuid
    FROM decision_authorized_to_vote
    JOIN users ON decision_users.id = user_id
    JOIN polls ON decision_authorized_to_vote.poll_id = decision_polls.id
    WHERE authorized_to_vote.user_id='3';
    `, [user_id])
    .then (data => {
      return data.rows;
    })
    .catch (error => {
      console.error(`An error has occurred while attempting to fetch the polls authorized for user:`, error);
      throw error;
    });
};

module.exports = getPollsAuthorizedToVoteByUser;
