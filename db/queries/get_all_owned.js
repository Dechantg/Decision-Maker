

const db = require('../connection');

const allOwned = (userId) => {
  return db.query (
  `
  SELECT decision_polls.uuid, poll_name, poll_description, created_at, opens_at,closes_at, poll_active, poll_deleted
  FROM decision_polls
  WHERE poll_creator_id = $1
  ORDER BY created_at DESC;
  `, [userId])
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
