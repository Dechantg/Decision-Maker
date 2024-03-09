const db = require('../connection');

const getQuestions = async (uuid) => {
  try {
    const data = await db.query(
      `
      SELECT decision_poll_options.id AS question_id, decision_poll_options.title AS option, decision_poll_options.description AS option_details
      FROM decision_poll_options
      JOIN decision_polls ON decision_polls.id = poll_id
      WHERE decision_polls.uuid = $1;
      `, [uuid]
    );

    const questionDetails = data.rows;
    return questionDetails;
  } catch (error) {
    console.error(`An error has occurred while attempting to retrieve questions for poll UUID ${uuid}.`, error);
    throw error;
  }
};

module.exports = getQuestions;
