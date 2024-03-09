const db = require('../connection');

const allAuthorized = async (userId) => {
  try {
    const data = await db.query(
      `
      SELECT poll_id, decision_polls.uuid, poll_name, poll_description, created_at, closes_at, poll_active, opens_at
      FROM decision_authorized_to_vote
      JOIN decision_polls ON decision_polls.id = poll_id
      WHERE user_id = $1 AND NOT poll_deleted
      ORDER BY opens_at DESC;
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
