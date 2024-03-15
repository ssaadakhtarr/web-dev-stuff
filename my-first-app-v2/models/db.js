// db.js

const { MongoClient } = require('mongodb');

const url = 'mongodb://0.0.0.0:27017';
const dbName = 'test_db';

async function connectToMongoDB() {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db(dbName);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

module.exports = { connectToMongoDB };
