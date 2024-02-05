



const db = require('../connection');

const ChangePollStatus = async (pollId, userId, pollStatus) => {
  try {
    const result = await db.query(`
      UPDATE polls
      SET poll_active = $3
      WHERE id = $1 AND poll_creator_id = $2
      RETURNING *;`, [pollId, userId, pollStatus]);

    if (result.rowCount === 0) {
      console.error(`Invalid user or no poll found with ID ${pollId}`);
      throw new Error("Invalid user or no poll found");
    }

    console.log(`Poll ID ${pollId} Status has been marked ${pollStatus}.`);
    return true;
  } catch (error) {
    console.error(`An error has occurred while attempting to mark poll ID ${pollId} as deleted.`);
    throw error;
  }
};

module.exports = ChangePollStatus;
