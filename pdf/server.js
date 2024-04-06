// server.js

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/investup', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Define MongoDB schema

const startupSchema = new mongoose.Schema({
    name: String,
    email: String,
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
    team: String,
});

const Startup = mongoose.model('pitches', startupSchema);
app.use(express.static('pdf'));
// Define API route to fetch data
app.get('/api/startups', async (req, res) => {
    try {
        const startups = await Startup.find();
        res.json(startups);
    } catch (error) {
        console.error('Error fetching startups:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
