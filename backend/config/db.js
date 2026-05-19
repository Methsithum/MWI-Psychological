const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;
    
    // Fix: Extract components and rebuild URI with properly encoded database name
    // Pattern: mongodb+srv://user:pass@cluster/database?options
    const uriRegex = /^(mongodb\+srv:\/\/[^/]+@[^/]+)\/([^?]+)(\?.*)?$/;
    const match = mongoUri.match(uriRegex);
    
    if (match) {
      const [, base, dbName, queryString] = match;
      // Encode the database name to handle spaces
      const encodedDb = encodeURIComponent(dbName);
      mongoUri = `${base}/${encodedDb}${queryString || ''}`;
      console.log('Connection URI encoded for special characters in database name');
    }

    const conn = await mongoose.connect(mongoUri, {
      autoIndex: false,
      connectTimeoutMS: 10000,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
