const mongoose = require('mongoose');

let cachedConnection = null;

const connectDB = async () => {
    if (cachedConnection && mongoose.connection.readyState === 1) {
        console.log('Using cached MongoDB connection');
        return cachedConnection;
    }

    try {
        console.log('Connecting to MongoDB...');
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            // Modern Mongoose does not require useNewUrlParser or useUnifiedTopology
            serverSelectionTimeoutMS: 10000,
        });

        cachedConnection = db;
        console.log('MongoDB Connected Successfully');
        return db;
    } catch (err) {
        console.error('MongoDB Connection Error:', err.message);
        throw err;
    }
};

module.exports = connectDB;
