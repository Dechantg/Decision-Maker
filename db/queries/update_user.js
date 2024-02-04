

const db = require('../connection');


const addUser = async (email, firstName, lastName, hashedPassword) => {
  try {
    const data = await db.query(
      `
      INSERT INTO users (email, first_name, last_name, password_hash, signed_up)
      VALUES ($1, $2, $3, $4, TRUE)
      RETURNING id, email;
      `,
      [email, firstName, lastName, hashedPassword]
    );

    console.log(`New ${email} has been added`);
    return { id: data.rows[0].id, email: data.rows[0].email };
  } catch (error) {
    console.error(`An error has occurred while adding ${user_email}: `, error);
    return false;
  }
};

module.exports = addUser;
