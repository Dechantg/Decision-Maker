const db = require('../connection');

const selectTimeRemaining =  (poll_id) => {
  return db.query (
    `
    SELECT EXACT (EPOCH FROM (closes_at - NOW())) AS time_remaining
    FROM decision_polls
    WHERE id = $1;
    `, [poll_id])
    .then(data => {
      if (data.rows.length > 0) {
        const timeInSeconds = data.rows[0].time_remaining;
        const days = Math.floor(timeInSeconds / (60 * 60 * 24));
        const hours = Math.floor((timeInSeconds % (60 * 60 * 24)) / (60 * 60));
        const minutes = Math.floor((timeInSeconds % (60 * 60)) / 60);

        console.log(`Poll ${poll_id} has ${days} days, ${hours} hours, and ${minutes} minutes remaining before it closes.`);
        return {
          days,
          hours,
          minutes
        };
      } else {
        console.log(`Poll ${poll_id} not found or is already closed.`);
        return null;
      }
    });
};

module.exports = selectTimeRemaining;
