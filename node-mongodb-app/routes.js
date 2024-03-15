// routes.js

const express = require('express');
const router = express.Router();
const { connectToMongoDB } = require('./db');

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const db = await connectToMongoDB();
        const usersCollection = db.collection('users');

        // Insert new user into the database
        await usersCollection.insertOne({ username, password });
        console.log('User inserted successfully:', { username, password });

        // Retrieve the inserted user data from the database
        const insertedUser = await usersCollection.findOne({ username });

        if (insertedUser) {
            console.log('Inserted User:', insertedUser);
        } else {
            console.log('User not found in database after insertion');
        }
        res.send('User registered successfully!');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
