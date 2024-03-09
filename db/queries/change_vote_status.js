

const db = require('../connection');

const changeStatus = async (user_id, poll_id) => {
  try {
    await db.query(
      `
      UPDATE decision_authorized_to_vote
      SET has_voted = true
      WHERE user_id = $1
      AND poll_id = $2
      `,
      [user_id, poll_id]
    );

    // Return a success message or a boolean value indicating success
    return true;
  } catch (error) {
    console.error(`An error has occurred while checking authorization for user ${user_id} in poll ${poll_id}:`, error);
    throw error;
  }
};

module.exports = changeStatus;
