
const db = require('../connection');

const insertBorda = (pollId) => {
  return db.query(
    `
    UPDATE polls
    SET
      result_winner = (
        SELECT option_id
        FROM user_choice
        WHERE poll_id = $1
        GROUP BY option_id
        ORDER BY SUM(selection_made) DESC
        LIMIT 1
      ),
      result_runner_up = (
        SELECT option_id
        FROM user_choice
        WHERE poll_id = $1
        GROUP BY option_id
        ORDER BY SUM(selection_made) DESC
        LIMIT 1 OFFSET 1
      ),
      result_third_choice = (
        SELECT option_id
        FROM user_choice
        WHERE poll_id = $1
        GROUP BY option_id
        ORDER BY SUM(selection_made) DESC
        LIMIT 1 OFFSET 2
      )
    WHERE id = $1
    RETURNING *
    `,
    [pollId]
  )
    .then((data) => {
      const updatedPoll = data.rows[0];
      return updatedPoll;
    })
    .catch((error) => {
      console.error('An error has occurred while attempting to update poll results.', error);
      throw error;
    });
};

module.exports = insertBorda;
