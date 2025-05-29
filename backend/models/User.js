const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: mongoose.Schema.Types.Mixed,
  password: mongoose.Schema.Types.Mixed, 
});

module.exports = mongoose.model('User', UserSchema);
