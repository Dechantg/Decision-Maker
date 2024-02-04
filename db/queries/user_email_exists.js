


const db = require('../connection');

const userExists = async (email) => {
  try {
    const data = await db.query(`
      SELECT id
      FROM users
      WHERE email = $1;
    `, [email]);

    console.log('Query results:', data.rows);

    const userExists = data.rows[0];
    console.log(`The user ${email} exists: ${userExists}`);

    return userExists;
  } catch (error) {
    console.error('Error in userExists:', error);
    return false;
  }
};

module.exports = userExists;