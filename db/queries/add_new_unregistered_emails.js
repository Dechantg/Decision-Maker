


const db = require('../connection');

const addNewEmails = async (emails) => {
  try {

    if (emails.length === 0) {
      console.log("No emails to add.");
      return [];
    }
    const placeholders = emails.map((_, index) => `($${index + 1})`).join(',');

    const data = await db.query(`
      INSERT INTO users (email)
      VALUES ${placeholders}
      RETURNING id;`,
      emails
    );

    const insertedEmails = data.rows;
    console.log("Inserted emails:", insertedEmails);
    return insertedEmails;
  } catch (error) {
    console.error('An error occurred while adding emails:', error);
    return error;
  }
};


module.exports = addNewEmails;


