
const db = require('../connection');

const allAuthorized = async (pollId, pollCreator) => {
  try {
    const data = await db.query(
      `
      SELECT decision_users.email, decision_authorized_to_vote.email_sent
      FROM decision_users
      JOIN decision_authorized_to_vote ON decision_users.id = decision_authorized_to_vote.user_id
      WHERE decision_authorized_to_vote.poll_id = $1
        AND decision_users.id != $2;
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
