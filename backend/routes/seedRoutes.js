const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

// Admin seed endpoint - creates test credentials
router.post('/seed-test-data', asyncHandler(async (req, res) => {
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

  // Delete existing test users
  await User.deleteMany({ email: { $in: testUsers.map(u => u.email) } });

  // Hash passwords and insert directly
  const created = [];
  for (const userData of testUsers) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    
    const userDoc = {
      ...userData,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    await User.collection.insertOne(userDoc);
    created.push({
      role: userData.role,
      email: userData.email,
      password: userData.password,
    });
  }

  res.status(201).json({
    success: true,
    message: 'Test users created successfully',
    users: created,
  });
}));

module.exports = router;
