


const db = require('../connection');

const getByUuid = async (uuid) => {
  try {
    const data = await db.query(`
      SELECT id, poll_creator_id, poll_name, poll_description, opens_at, closes_at, poll_active, poll_deleted, created_at
      FROM polls
      WHERE uuid = $1;
    `, [uuid]);


    const pollByUuid = data.rows[0];

    console.log('Query results:', pollByUuid);


    return pollByUuid;
  } catch (error) {
    console.error('Error in pollByUuid:', error);
    return false;
  }
};

module.exports = getByUuid;
