
const db = require('../connection');

const allAuthorized = async (pollId, pollCreator) => {
  try {
    const data = await db.query(
      `
      SELECT users.email, authorized_to_vote.email_sent
      FROM users
      JOIN authorized_to_vote ON users.id = authorized_to_vote.user_id
      WHERE authorized_to_vote.poll_id = $1
        AND users.id != $2;
      `, [pollId, pollCreator]
    );

    const authorizedEmails = data.rows;
    return authorizedEmails;
  } catch (error) {
    console.error(`An error has occurred while fetching the details of authorized to vote poll_id ${userId}.`, error);
    throw error;
  }
};

module.exports = allAuthorized;
