const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/vuln_blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Log successful connection
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Log errors
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

// Enable query logging
mongoose.set('debug', (collectionName, method, query, doc) => {
  console.log(`[MongoDB] ${collectionName}.${method}`, JSON.stringify(query), doc);
});

module.exports = db;