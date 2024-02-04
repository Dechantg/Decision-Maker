const db = require('../connection');



const insertAuthorizedToVote = async (userIds, pollId) => {
  try {
    const placeholders = userIds.map((_, index) => `($${index * 2 + 1}, $${index * 2 + 2})`).join(',');

    const values = [].concat(...userIds.map(userId => [userId, pollId]));

    const data = await db.query(`
      INSERT INTO authorized_to_vote (user_id, poll_id)
      VALUES ${placeholders}
      RETURNING id;`,
      values
    );

    const areAdded = data.rows.length === userIds.length;
    console.log(`New users have been added as authorized voters in poll ${pollId}`);
    return areAdded;
  } catch (error) {
    console.error(`An error has occurred while adding users as authorized voters in poll ${pollId}:`, error);
    throw error;
  }
};

module.exports = insertAuthorizedToVote;
