const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { Investor, Startup } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/investup', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use(bodyParser.json());
app.use(express.static('public'));

// Hash function using SHA-256
function sha256(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

// Signup routes
app.post('/signup/investor', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = sha256(password); // Hash password
    const investor = new Investor({ firstName, lastName, email, password: hashedPassword });
    await investor.save();
    res.status(201).send('Investor signed up successfully');
  } catch (error) {
    console.error('Error signing up investor:', error);
    res.status(500).send('Error signing up investor');
  }
});

app.post('/signup/startup', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = sha256(password); // Hash password
    const startup = new Startup({ firstName, lastName, email, password: hashedPassword });
    await startup.save();
    res.status(201).send('Startup signed up successfully');
  } catch (error) {
    console.error('Error signing up startup:', error);
    res.status(500).send('Error signing up startup');
  }
});

// Login routes
app.post('/login/investor', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = sha256(password); // Hash provided password
    const investor = await Investor.findOne({ email, password: hashedPassword });
    if (investor) {
      res.redirect('/home.html'); // Redirect to home.html
    } else {
      res.status(401).send('Invalid email or password');
    }
  } catch (error) {
    console.error('Error logging in investor:', error);
    res.status(500).send('Error logging in investor');
  }
});

app.post('/login/startup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = sha256(password); // Hash provided password
    const startup = await Startup.findOne({ email, password: hashedPassword });
    if (startup) {
      res.redirect('/home.html'); // Redirect to home.html
    } else {
      res.status(401).send('Invalid email or password');
    }
  } catch (error) {
    console.error('Error logging in startup:', error);
    res.status(500).send('Error logging in startup');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
