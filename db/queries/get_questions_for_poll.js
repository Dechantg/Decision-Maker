const db = require('../connection');

const getQuestions = (uuid) => {
  return db.query (
  `
  SELECT poll_options.id AS question_id, poll_options.title AS option, poll_options.description AS option_details
  FROM poll_options
  JOIN polls ON polls.id = poll_id
  WHERE polls.uuid = $1;
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

module.exports = getQuestions;
