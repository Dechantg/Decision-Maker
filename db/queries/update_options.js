



const db = require('../connection');


const updateOptions = async (options) => {

  try {
    const updates = options.map((option, index) => `($${index * 3 + 1}, $${index * 3 + 2}, $${index * 3 + 3})`).join(',');

    const values = [].concat(...options.map(option => [option.id, option[Object.keys(option)[1]], option[Object.keys(option)[2]]]));

    const data = await db.query(
      `
      UPDATE poll_options
      SET title = $2, description = $3
      WHERE id = $1;
      `,
      values
    );

    console.log(`${data.rowCount} rows updated`);
    return true;
  } catch (error) {
    console.error(`An error has occurred while updating rows: `, error);
    return false;
  }
};


module.exports = updateOptions;
