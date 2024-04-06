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

// Define pitch schema
const pitchSchema = new mongoose.Schema({
  startupOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'Startup', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  // Define other fields of the pitch schema
  executiveSummary: String,
  problemStatement: String,
  solution: String,
  patentStatus: String,
  marketAnalysis: String,
  businessModel: String,
  goToMarketStrategy: String,
  financialProjections: String,
  fundingNeeds: String,
  exitStrategy: String,
  progress: String,
  team: String
});

// Create models
const Investor = mongoose.model('Investor', investorSchema);
const Startup = mongoose.model('Startup', startupSchema);
const Pitch = mongoose.model('Pitch', pitchSchema);

module.exports = { Investor, Startup, Pitch };
