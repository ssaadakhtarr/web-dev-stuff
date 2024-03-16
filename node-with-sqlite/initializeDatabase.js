// initializeDatabase.js

const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const databaseFile = 'path_to_database.db';

// Check if the database file exists
if (!fs.existsSync(databaseFile)) {
    // Create a new SQLite database connection
    const db = new sqlite3.Database(databaseFile);

    // Define SQL command to create table
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    `;

    // Execute SQL command to create table
    db.serialize(() => {
        db.run(createTableQuery, (err) => {
            if (err) {
                console.error('Error creating table:', err);
            } else {
                console.log('Table created successfully!');
            }
        });
    });

    // Close the database connection
    db.close();
} else {
    console.log('Database file already exists.');
}
