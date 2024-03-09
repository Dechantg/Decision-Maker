const db = require('../connection');

const setEmailStatus = async (userIds, pollId, emailStatus) => {
  try {
    const placeholders = userIds.map((_, index) => `$${index + 1}`).join(',');

    const data = await db.query(`
    UPDATE decision_authorized_to_vote
    SET email_sent = $${userIds.length + 1}
    WHERE user_id IN (${placeholders}) AND poll_id = $${userIds.length + 2}
    RETURNING id, email_sent;`,
      [...userIds, emailStatus, pollId]
    );

    const emailStatusUpdate = data.rows;
    return emailStatusUpdate;
  } catch (error) {
    console.error(`An error has occurred while marking userId email status in poll ${pollId}:`, error);
    throw error;
  }
};

module.exports = setEmailStatus;
