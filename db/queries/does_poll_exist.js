const db = require('../connection');

const pollExists = (uuid) => {
  console.log('here is the uuid as it enters the query', uuid)
  return db.query (
    `
    SELECT uuid
    FROM polls
    WHERE uuid = $1;
    `, [uuid])
    .then((data) => {
      console.log('Query results:', data.rows);
      const uuidExists = data.rows.length > 0;
      console.log(`The UUID ${uuid} exists: ${uuidExists}`);
      return uuidExists;
    })
    .catch((error) => {
      console.error('Error in pollExists:', error);
      return false;
    });
};

module.exports = pollExists;






module.exports = pollExists;
