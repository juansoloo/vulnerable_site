const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    console.log('Login attempt:', { username, password });
    if (!user) {
      console.log('User not found');
      return res.json({ success: false, message: 'User not found' });
    }
    console.log('DB user:', user);
    if (user.password !== password) {
      console.log('Password mismatch:', user.password, password);
      return res.json({ success: false, message: 'Incorrect password' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Register new user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if user already exists
    const existing = await User.findOne({ username });
    if (existing) {
      return res.json({ success: false, message: 'Username already taken' });
    }
    // Create new user
    const user = new User({ username, password });
    await user.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
