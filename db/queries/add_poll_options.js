

const db = require('../connection');

const addOptions = async (pollId, options) => {
  try {
    const placeholders = options.map((_, index) => `($1, $${index * 2 + 2}, $${index * 2 + 3})`).join(',');

    const values = [pollId, ...options.flatMap(option => [Object.keys(option)[0], Object.values(option)[0]])];

    const data = await db.query(`
      INSERT INTO poll_options (poll_id, title, description)
      VALUES ${placeholders}
      RETURNING *;`,
      values
    );

    const insertedOptions = data.rows;
    console.log("Inserted options:", insertedOptions);
    return insertedOptions;
  } catch (error) {
    console.error('An error occurred while adding options:', error);
    return error;
  }
};

module.exports = addOptions;
