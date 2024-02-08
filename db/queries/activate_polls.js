


const db = require('../connection');



const activatePolls = async () => {
  try {
    const result = await db.query(`
    UPDATE polls
    SET poll_active = true
    WHERE opens_at <= NOW() AND closes_at >= NOW() AND force_active_status IS NOT TRUE AND poll_active IS NOT TRUE
    RETURNING *;
  `);

      const updatedRows = result.rows;


    console.log(`${result.rowCount} polls set to active between opens_at and closes_at`);
    return updatedRows;

  } catch (error) {
    console.error(`An error has occurred while attempting to set polls to active between opens_at and closes_at.`);
    throw error;
  }
};

module.exports = activatePolls;
