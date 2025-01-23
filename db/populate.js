const pool = require('./db');

const populateDB = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      text TEXT NOT NULL,
      username TEXT NOT NULL,
      added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const insertMessagesQuery = `
    INSERT INTO messages (text, username)
    VALUES 
      ('Hi there!', 'Amando'),
      ('Hello World!', 'Charles')
    ON CONFLICT DO NOTHING; -- Avoid duplication if re-run
  `;

  try {
    await pool.query(createTableQuery);
    console.log('Table created successfully or already exists.');

    await pool.query(insertMessagesQuery);
    console.log('Sample messages inserted successfully.');
  } catch (error) {
    console.error('Error populating the database:', error);
  } finally {
    pool.end();
  }
};

populateDB();
