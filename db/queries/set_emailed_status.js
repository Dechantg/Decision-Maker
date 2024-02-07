const db = require('../connection');


const setEmailStatus = async (userIds, pollId, emailStatus) => {
  try {
    const userIdArray = userIds.map(user => user.id);
    const placeholders = userIdArray.map((_, index) => `$${index + 1}`).join(',');

    const data = await db.query(`
    UPDATE authorized_to_vote
    SET email_sent = $${userIdArray.length + 1}
    WHERE user_id IN (${placeholders}) AND poll_id = $${userIdArray.length + 2}
    RETURNING id, email_sent;`,
      [...userIdArray, emailStatus, pollId]
    );

    const emailStatusUpdate = data.rows;
    return emailStatusUpdate;
  } catch (error) {
    console.error(`An error has occurred while marking userId email status in poll ${pollId}:`, error);
    throw error;
  }
};
module.exports = setEmailStatus;
