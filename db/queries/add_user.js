
const db = require('../connection');

const addUser = (user_email) => {
  return db.query(
    `
    INSERT INTO users (email)
    VALUES ($1)
    RETURNING email;
    `,
    [user_email]
  )
    .then((data) => {
      console.log(`New ${user_email} has been added`);
      return true;
    })
    .catch((error) => {
      console.error(`An error has occurred while adding ${user_email}: `, error);
      return false;
    });
};

module.exports = addUser;
