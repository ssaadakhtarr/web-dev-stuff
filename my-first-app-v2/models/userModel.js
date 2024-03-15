// userModel.js

const { connectToMongoDB } = require('./db');

async function createUser(username, password) {
    const db = await connectToMongoDB();
    const usersCollection = db.collection('users');
    await usersCollection.insertOne({ username, password });
}

async function findUserByUsername(username) {
    const db = await connectToMongoDB();
    const usersCollection = db.collection('users');
    console.log('usermodal');
    console.log(typeof(username));
    return usersCollection.findOne({ username });
}

module.exports = { createUser, findUserByUsername };
