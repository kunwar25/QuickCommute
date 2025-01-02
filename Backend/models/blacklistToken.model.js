
const mongoose = require('mongoose');

const blacklistedTokenSchema = new mongoose.Schema({
  token: { type: String, required: true ,
    unique: true
  },
  createdAt: { type: Date, default: Date.now,  expires: 86400 }
});

module.exports = mongoose.model('BlacklistedToken', blacklistedTokenSchema);