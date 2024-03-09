

const db = require('../connection');

const updateDetails = async (pollId, pollName, pollDescription, opensAt, closesAt, userId) => {
  try{
    const data = await db.query(
      `
    UPDATE decision_polls
    SET poll_name = $1, poll_description = $2, opens_at = $3, closes_at = $4
    WHERE id = $5 AND poll_creator_id = $6;
    `,
    [pollName, pollDescription, opensAt, closesAt, pollId, userId]
  )
    const newPoll = data.rows[0];
    return newPoll;

    } catch(error) {
      console.error(`An error has occurred while adding ${user_email}: `, error);
      return false;
    };
};


module.exports = updateDetails;
