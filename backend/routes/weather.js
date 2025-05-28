const express = require('express');
const router = express.Router();
const WeatherPhenomenon = require('../models/WeatherPhenomenon');

// Get all
router.get('/', async (req, res) => {
    const { title } = req.query;

    try {
        let items;
        if (title) {
            // Simple case-insensitive search
            items = await WeatherPhenomenon.find({ title: { $regex: title, $options: 'i' } });
        } else {
            items = await WeatherPhenomenon.find();
        }
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

// Add new
router.post('/', async (req, res) => {
    try {
        const item = await WeatherPhenomenon.create(req.body);
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add item' });
    }
});

module.exports = router;