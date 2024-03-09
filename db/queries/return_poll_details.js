const db = require('../connection');

const pollDetails = (uuid) => {
  return db.query (
  `
  SELECT *
  FROM decision_polls
  WHERE uuid = $1;
  `, [uuid])
    .then(data => {
      const pollDetails = data.rows;
      return pollDetails;
    })
    .catch (error => {
      console.error(`An error has occured while fetching the details of poll UUID ${uudi}.`, error);
      throw error;
    });
};

module.exports = pollDetails;
