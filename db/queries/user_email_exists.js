


const db = require('../connection');

const userExists = async (email) => {
  try {
    const data = await db.query(`
      SELECT id
      FROM decision_users
      WHERE email = $1;
    `, [email]);

    console.log('Query results:', data.rows);

    const userExists = data.rows[0];

    return userExists;
  } catch (error) {
    console.error('Error in userExists:', error);
    return false;
  }
};

module.exports = userExists;
