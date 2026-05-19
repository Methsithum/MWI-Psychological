require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');

// Try to extract and fix the MONGO_URI for database with spaces
let MONGO_URI = process.env.MONGO_URI;
console.log('Attempting connection...');

// Replace space in database name with %20 if needed
if (MONGO_URI && MONGO_URI.includes('MWI Psychology')) {
  MONGO_URI = MONGO_URI.replace(/MWI Psychology/g, 'MWI%20Psychology');
  console.log('Encoded database name in URI');
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      autoIndex: false,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Connection failed:', error.message);
    process.exit(1);
  }
};

const User = require('../models/User');

const testUsers = [
  {
    fullName: 'Admin User',
    email: 'admin@test.com',
    password: 'admin123',
    role: 'admin',
    status: 'approved',
    nic: 'ADMIN001',
  },
  {
    fullName: 'Teacher User',
    email: 'teacher@test.com',
    password: 'teacher123',
    role: 'teacher',
    status: 'approved',
    nic: 'TEACHER001',
  },
  {
    fullName: 'Student User',
    email: 'student@test.com',
    password: 'student123',
    role: 'student',
    status: 'approved',
    nic: 'STUDENT001',
    program: 'hrm',
  },
];

const seedTestUsers = async () => {
  try {
    await connectDB();
    console.log('Connected to database');
    
    // Test: List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));

    // Get the users collection directly
    const db = mongoose.connection.db;
    
    // Try alternative collection access
    let usersCollection;
    try {
      usersCollection = db.collection('users');
    } catch (e) {
      console.log('Direct collection access failed, trying via connection');
      usersCollection = mongoose.connection.collection('users');
    }

    // Delete existing test users
    for (const user of testUsers) {
      try {
        await usersCollection.deleteOne({ email: user.email });
      } catch (e) {
        console.log(`Delete failed for ${user.email}:`, e.message);
      }
    }
    console.log('Cleared existing test users');

    // Hash passwords and insert directly
    const bcrypt = require('bcryptjs');
    for (const userData of testUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const userDoc = {
        ...userData,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await usersCollection.insertOne(userDoc);
      console.log(`✓ Created ${userData.role}: ${userData.email} / ${userData.password}`);
    }

    console.log('\n=== Test Credentials ===');
    console.log('Admin:   admin@test.com / admin123');
    console.log('Teacher: teacher@test.com / teacher123');
    console.log('Student: student@test.com / student123');
    console.log('========================\n');

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding test users:', error.message);
    process.exit(1);
  }
};

seedTestUsers();
