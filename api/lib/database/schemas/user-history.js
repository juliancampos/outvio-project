let mongoose = require('mongoose');
const expireAfterSeconds = Number(process.env.USER_PERIOD_TIME);

let userHistory = mongoose.Schema({
  username: String,
  route: String,
  weight: Number
}, {
  timestamps: true
});

userHistory.index({ createdAt: 1 }, { expireAfterSeconds });

module.exports = mongoose.model('userHistory', userHistory);
