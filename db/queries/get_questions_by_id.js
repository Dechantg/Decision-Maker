const db = require('../connection');

const getQuestions = async (pollId) => {
  try {
    const data = await db.query(
      `
      SELECT id, title, description
      FROM poll_options
      WHERE poll_id = $1;
      `, [pollId]
    );

    const questionDetails = data.rows;
    return questionDetails;
  } catch (error) {
    console.error(`An error has occurred while attempting to retrieve questions for poll ${pollId}.`, error);
    throw error;
  }
};

module.exports = getQuestions;
