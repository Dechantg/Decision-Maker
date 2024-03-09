const fs = require('fs');
const path = require('path');

const db = require('../connection');

async function uploadSchema() {
  try {
    const schemaFilePath = path.join(__dirname, '../schema/01_database_layout.sql');
    const schema = fs.readFileSync(schemaFilePath, 'utf8');

    // Execute the schema SQL using pg
    await db.query(schema);

    console.log('Schema uploaded successfully.');
  } catch (error) {
    console.error('Error uploading schema:', error);
  } finally {
    // Close the database connection
    db.end();
  }
}

module.exports = uploadSchema;
