const db = require('../connection');

const hasVoted = async (user_id, poll_id) => {
  try {
    const result = await db.query(
      `
      SELECT has_voted
      FROM decision_authorized_to_vote
      WHERE user_id = $1 AND poll_id = $2
      `,
      [user_id, poll_id]
    );

    return result.rows[0].has_voted;
  } catch (error) {
    console.error(`An error has occurred while checking authorization for user ${user_id} in poll ${poll_id}:`, error);
    throw error;
  }
};

module.exports = hasVoted;
