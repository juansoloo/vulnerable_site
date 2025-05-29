const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 🚪 Login (NoSQL injectable)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt:', { username, password });
  try {
    const user = await User.findOne({ username, password });
    console.log('User found:', user);
    if (!user) {
      return res.json({ success: false, message: 'Invalid credentials' });
    }

    // Set session
    req.session.user = {
      id: user._id,
      username: user.username
    };

    console.log('Login success:', user.username);

    // Redirect to dashboard
    res.json({ success: true });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existing = await User.findOne({ username });
    if (existing) {
      return res.json({ success: false, message: 'Username already taken' });
    }

    const user = new User({ username, password });
    await user.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Dashboard
router.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.status(401).send('<h1>Not logged in</h1><a href="/">Go home</a>');
  }

  res.send(`
    <h1>Welcome, ${req.session.user.username}</h1>
    <p>You are now logged in via session!</p>
    <a href="/api/auth/logout">Logout</a>
  `);
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
