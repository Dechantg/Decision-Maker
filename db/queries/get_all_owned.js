

const db = require('../connection');

const allOwned = (userId, deleted) => {
  return db.query (
  `
  SELECT polls.uuid, poll_name, poll_description, created_at, closes_at, poll_active
  FROM polls
  WHERE poll_creator_id = $1 AND poll_deleted = $2;
  `, [userId, deleted])
    .then(data => {
      const pollDetails = data.rows;
      return pollDetails;
    })
    .catch (error => {
      console.error(`An error has occured while fetching the details of authorized to vote poll_id ${userId}.`, error);
      throw error;
    });
};

module.exports = allOwned;
