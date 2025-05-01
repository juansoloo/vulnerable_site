const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String, // 👎 no hashing
});

module.exports = mongoose.model('User', UserSchema);
