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

module.exports = router;
