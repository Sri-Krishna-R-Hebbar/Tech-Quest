const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Pitch, Startup } = require('./pitchModel'); // Assuming pitchModel.js exports both Pitch and Startup models

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/investup', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('pitch'));

// Route for submitting pitch
app.post('/submitPitch', async (req, res) => {
  try {
    // Find the startup owner based on the email provided in the form
    const startupOwner = await Startup.findOne({ email: req.body.Email });

    if (!startupOwner) {
      return res.status(404).send('Startup owner not found');
    }

    // Create new Pitch instance
    const newPitch = new Pitch({
      startupOwner: startupOwner._id,
      name: req.body.Name,
      email: req.body.Email,
      executiveSummary: req.body.executive_summary,
      problemStatement: req.body.problem_statement,
      solution: req.body.solution,
      patentStatus: req.body.patent_status,
      marketAnalysis: req.body.market_analysis,
      businessModel: req.body.business_model,
      goToMarketStrategy: req.body.go_to_market_strategy,
      financialProjections: req.body.financial_projections,
      fundingNeeds: req.body.funding_needs,
      exitStrategy: req.body.exit_strategy,
      progress: req.body.progress,
      team: req.body.team
    });

    // Save the pitch
    await newPitch.save();

    res.status(200).send('Pitch submitted successfully');
  } catch (err) {
    console.error('Error submitting pitch:', err);
    res.status(500).send('Error submitting pitch');
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
