const db = require('../connection');

const registerVotes = (uuid) => {
  return db.query (
  `
  INSERT INTO decision_user_choice (user_id, poll_id, option_id, selection_made)
  SELECT decision_poll_options.title AS option, decision_poll_options.description AS option_details
  FROM poll_options
  JOIN decision_polls ON decision_polls.id = poll_id
  WHERE decision_polls.uuid = $1;
  `, [uuid])
    .then(data => {
      const questionDetails = data.rows;
      return questionDetails;
    })
    .catch (error => {
      console.error(`An error has occured while attempting to retrieve questions for poll UUID ${uuid}.`, error);
      throw error;
    });
};

module.exports = registerVotes;
