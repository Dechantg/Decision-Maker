const db = require('../connection');

const deleteAuthorizedToVote = async (userIds, pollId) => {
  try {
    const placeholders = userIds.map((_, index) => `($${index * 2 + 1}, $${index * 2 + 2})`).join(',');

    const values = [].concat(...userIds.map(userId => [userId, pollId]));

    const data = await db.query(`
      DELETE FROM authorized_to_vote
      WHERE (user_id, poll_id) IN (${placeholders});`,
      values
    );

    const rowsDeleted = data.rowCount;
    return rowsDeleted;
  } catch (error) {
    console.error(`An error has occurred while deleting authorized voters for poll ${pollId}:`, error);
    throw error;
  }
};

module.exports = deleteAuthorizedToVote;
