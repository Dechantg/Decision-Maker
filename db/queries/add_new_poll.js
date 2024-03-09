


const db = require('../connection');

const addPoll = async (pollName, pollDescription, userId, pollUuid, opensAt, closesAt) => {
  try{
    const data = await db.query(
      `
    INSERT INTO decision_polls (poll_name, poll_description, poll_creator_id, uuid, opens_at, closes_at)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id;
    `,
    [pollName, pollDescription, userId, pollUuid, opensAt, closesAt]
  )
    const newPoll = data.rows[0];
    return newPoll;

    } catch(error) {
      console.error(`An error has occurred while adding ${pollName}: `, error);
      return false;
    };
};

module.exports = addPoll;
