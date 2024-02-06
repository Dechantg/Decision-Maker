



const db = require('../connection');

const updateOptions = async (options) => {
  try {
    if (options.length === 0) {
      console.log('No options to update');
      return true;
    }

    for (const option of options) {
      const id = option.id;
      const title = Object.keys(option)[1]; // Get the title from the second key
      const description = option[title]; // Get the description using the title as the key

      const values = [id, title, description];

      const query = `
        UPDATE poll_options
        SET title = $2, description = $3
        WHERE id = $1
        RETURNING *;`;

      const data = await db.query(query, values);

      console.log(`${data.rowCount} rows updated for id ${id}`);
      console.log('Updated rows:', data.rows);
    }

    return true;
  } catch (error) {
    console.error(`An error has occurred while updating rows: `, error);
    return false;
  }
};



module.exports = updateOptions;
