// userModel.js

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('path_to_database.db');

function createUser(username, password) {
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.run(query, [username, password], function(err) {
        if (err) {
            console.error('Error creating user:', err);
        } else {
            console.log('User created successfully!');
        }
    });
}

function findUserByUsername(username) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE username = ?';
        db.get(query, [username], function(err, row) {
            if (err) {
                console.error('Error finding user:', err);
                reject(err);
            } else {
                console.log(row);
                resolve(row); // Resolve with the retrieved user row
            }
        });
    });
}

module.exports = { createUser, findUserByUsername };
