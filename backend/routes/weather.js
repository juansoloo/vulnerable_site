const express = require('express');
const router = express.Router();
const WeatherPhenomenon = require('../models/WeatherPhenomenon');

// Get all
router.get('/', async (req, res) => {
  try {
    const items = await WeatherPhenomenon.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// Add new
router.post('/', async (req, res) => {
  const { title, description, imageUrl, link, author } = req.body;
  try {
    const item = new WeatherPhenomenon({ title, description, imageUrl, link, author });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add item' });
  }
});

module.exports = router;