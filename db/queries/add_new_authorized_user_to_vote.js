const db = require('../connection');

const insertNewUserIntoAuthorizedVote =  (user_id, poll_id) => {
  return db.query (
  `
  INSERT INTO autorized_to_vote (user_id, poll_id)
  VALUES ($1, $2)
  RETURNING id;
  `, [user_id, poll_id])
    .then(data => {
      const isAdded = data.rows.length > 0;
      console.log(`New ${user_id} has been added as an authorized voted in poll ${poll_id}`);
      return isAdded;
    })
    .catch(error => {
      console.error(`An error has occurred while adding ${user_id} as an authorized voter in poll ${poll_id}:`, error);
      throw error;
    });
};

module.exports = insertNewUserIntoAuthorizedVote;
