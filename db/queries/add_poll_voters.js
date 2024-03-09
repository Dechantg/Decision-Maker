


const db = require('../connection');

const addOptions = async (pollId, options) => {
  try {
    const placeholders = options.map((_, index) => `($1, $${index * 2 + 2}, $${index * 2 + 3})`).join(',');

    const values = [pollId, ...options.flatMap(option => [Object.keys(option)[0], Object.values(option)[0]])];

    const data = await db.query(`
      INSERT INTO decision_poll_options (poll_id, title, description)
      VALUES ${placeholders}
      RETURNING *;`,
      values
    );

    const insertedOptions = data.rows;
    return insertedOptions;
  } catch (error) {
    console.error('An error occurred while adding options:', error);
    return error;
  }
};

module.exports = addOptions;

