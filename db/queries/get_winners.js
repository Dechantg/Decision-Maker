

const db = require('../connection');

const getWinners = (uuid) => {
  return db.query (
  `
  SELECT
  CASE WHEN result_winner IS NOT NULL THEN (SELECT title FROM poll_options WHERE id = result_winner) END AS winner_title,
  CASE WHEN result_runner_up IS NOT NULL THEN (SELECT title FROM poll_options WHERE id = result_runner_up) END AS runner_up_title,
  CASE WHEN result_third_choice IS NOT NULL THEN (SELECT title FROM poll_options WHERE id = result_third_choice) END AS third_choice_title
FROM polls
WHERE uuid = $1;

  `, [uuid])
    .then(data => {
      const winnerDetails = data.rows;
      return winnerDetails;
    })
    .catch (error => {
      console.error(`An error has occured while fetching the details of poll UUID ${uudi}.`, error);
      throw error;
    });
};

module.exports = getWinners;
