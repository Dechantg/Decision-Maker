

const db = require('../connection');

const addAnswer = (userId, pollId, question, result) => {
  return db.query (
  `
  INSERT INTO decision_user_choice (user_id, poll_id, option_id, selection_made)
  VALUES ($1, $2, $3, $4)
  ON CONFLICT (user_id, poll_id, option_id)
  DO UPDATE SET selection_made = EXCLUDED.selection_made
  `, [userId, pollId, question, result])
    .then(data => {
      const questionDetails = data.rows;
      return questionDetails;
    })
    .catch(error => {
      console.error(`An error has occurred while attempting to add or update a choice.`, error);
      throw error;
    });
};

module.exports = addAnswer;
