// authController.js

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findUserByUsername } = require('../models/userModel');

const router = express.Router();

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    console.log(username);

    try {
        const user = await findUserByUsername(username);
        console.log("here");
        console.log(user);

        if (!user) {
            res.status(401).send('Invalid username or password');
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Generate JWT token
            const token = jwt.sign({ username: user.username }, 'your_secret_key', { expiresIn: '1h' });
            res.send({ token });
        } else {
            res.status(401).send('Invalid username or password');
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
