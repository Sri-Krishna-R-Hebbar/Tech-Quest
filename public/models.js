const mongoose = require('mongoose');

// Define investor schema
const investorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Define startup schema
const startupSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Create models
const Investor = mongoose.model('Investor', investorSchema);
const Startup = mongoose.model('Startup', startupSchema);

module.exports = { Investor, Startup };