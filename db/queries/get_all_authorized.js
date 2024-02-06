const db = require('../connection');

const allAuthorized = async (userId) => {
  try {
    const data = await db.query(
      `
      SELECT poll_id, polls.uuid, poll_name, poll_description, created_at, closes_at, poll_active
      FROM authorized_to_vote
      JOIN polls ON polls.id = poll_id
      WHERE user_id = $1 AND NOT poll_deleted;
      `, [userId]
    );

    const pollDetails = data.rows;
    return pollDetails;
  } catch (error) {
    console.error(`An error has occurred while fetching the details of authorized to vote poll_id ${userId}.`, error);
    throw error;
  }
};

module.exports = allAuthorized;
