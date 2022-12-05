let mongoose = require('mongoose');
const expireAfterSeconds = Number(process.env.IP_PERIOD_TIME);

let ipHistory = mongoose.Schema({
  ip: String,
  route: String,
  weight: Number
}, {
  timestamps: true
});

ipHistory.index({ createdAt: 1 }, { expireAfterSeconds });

module.exports = mongoose.model('ipHistory', ipHistory);
