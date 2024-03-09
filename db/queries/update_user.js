

const db = require('../connection');


const updateUser = async (email, firstName, lastName, hashedPassword) => {
  try {
    const data = await db.query(
      `
      UPDATE decision_users
      SET first_name = $2, last_name = $3, password_hash = $4, signed_up = TRUE
      WHERE email = $1
      RETURNING id, email;
      `,
      [email, firstName, lastName, hashedPassword]
    );

    if (data.rows.length === 0) {
      console.log(`No user found with email ${email}`);
      return null;
    }

    console.log(`User with email ${email} has been updated`);
    return { id: data.rows[0].id, email: data.rows[0].email };
  } catch (error) {
    console.error(`An error has occurred while updating ${email}: `, error);
    return false;
  }
};
module.exports = updateUser;
