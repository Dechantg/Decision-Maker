

const db = require('../connection');



const UpdateExpiredStatus = async () => {
  try {
    const result = await db.query(`
      UPDATE polls
      SET poll_active = false
      WHERE closes_at < NOW()
      RETURNING *;`);

    console.log(`${result.rowCount} polls past close date closed`);
    return true;
  } catch (error) {
    console.error(`An error has occurred while attempting to close all expired polls.`);
    throw error;
  }
};



module.exports = UpdateExpiredStatus;
