

const db = require('../connection');

const userExists = async (email) => {
  try {
    const data = await db.query(`
      SELECT id, email, password_hash, signed_up
      FROM decision_users
      WHERE email = $1;
    `, [email]);


    const userExists = data.rows[0];
    console.log('Query results:', userExists);


    return userExists;
  } catch (error) {
    console.error('Error in userExists:', error);
    return false;
  }
};

module.exports = userExists;
