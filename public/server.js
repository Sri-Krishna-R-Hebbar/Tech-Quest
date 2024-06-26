const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const session = require('express-session');
const { Investor, Startup } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://127.0.0.1:27017/investup', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use(bodyParser.json());
app.use(express.static('public'));

function sha256(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

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
    const hashedPassword = sha256(password); 
    const startup = new Startup({ firstName, lastName, email, password: hashedPassword });
    await startup.save();
    res.status(201).send('Startup signed up successfully');
  } catch (error) {
    console.error('Error signing up startup:', error);
    res.status(500).send('Error signing up startup');
  }
});

app.post('/login/investor', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = sha256(password); 
    const investor = await Investor.findOne({ email, password: hashedPassword });
    if (investor) {
      res.redirect('/home.html'); 
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
    const hashedPassword = sha256(password); 
    const startup = await Startup.findOne({ email, password: hashedPassword });
    if (startup) {
      res.redirect('/home.html'); 
    } else {
      res.status(401).send('Invalid email or password');
    }
  } catch (error) {
    console.error('Error logging in startup:', error);
    res.status(500).send('Error logging in startup');
  }
});

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Route to fetch user's name
app.get('/getUserName', async (req, res) => {
  try {
    // Check if user information is stored in session
    const user = req.session.user;

    if (!user) {
      return res.status(401).send('Unauthorized');
    }

    // Fetch user from the database based on their role
    let userFromDB;
    if (user.role === 'investor') {
      userFromDB = await Investor.findById(user._id);
    } else if (user.role === 'startup') {
      userFromDB = await Startup.findById(user._id);
    }

    if (!userFromDB) {
      return res.status(404).send('User not found');
    }

    // Send the user's name as JSON
    res.json({ name: `${userFromDB.firstName} ${userFromDB.lastName}` });

  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
