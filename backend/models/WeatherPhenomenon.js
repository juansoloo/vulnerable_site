const mongoose = require('mongoose');

const WeatherPhenomenonSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  link: String,
  author: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WeatherPhenomenon', WeatherPhenomenonSchema);