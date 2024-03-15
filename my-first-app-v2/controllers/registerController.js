// registerController.js

const express = require('express');
const bcrypt = require('bcrypt');
const { createUser } = require('../models/userModel');

const router = express.Router();

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user with hashed password
        await createUser(username, hashedPassword);
        res.send('User registered successfully!');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
