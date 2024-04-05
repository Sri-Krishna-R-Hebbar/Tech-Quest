const express = require("express");
const { urlencoded, json } = require("body-parser");
const { initializeApp, auth: _auth, database: _database } = require("firebase");

const app = express();
const port = 3000
const cors = require("cors");

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());

app.use(express.static('public'));

const firebaseConfig = {
  apiKey: "AIzaSyBLIh3X4M7oMQaju2Li9exSvp-2iikyQfI",
  authDomain: "login-and-signup-for-lawminds.firebaseapp.com",
  databaseURL: "https://login-and-signup-for-lawminds-default-rtdb.firebaseio.com",
  projectId: "login-and-signup-for-lawminds",
  storageBucket: "login-and-signup-for-lawminds.appspot.com",
  messagingSenderId: "153586382332",
  appId: "1:153586382332:web:10106dbafc7cac07e26e79",
  measurementId: "G-YCDVESSFCV"
};
initializeApp(firebaseConfig);

const auth = _auth();
const database = _database();

// Routes
app.post('/lawyer/signup', (req, res) => {
  const { firstName, lastName, email, barristerId, password } = req.body;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // Save user data to the database
      database.ref('lawyers/' + user.uid).set({
        firstName: firstName,
        lastName: lastName,
        email: email,
        barristerId: barristerId
      });
      res.status(200).send('Lawyer signed up successfully');
    })
    .catch((error) => {
      console.error('Lawyer signup error:', error.message);
      res.status(500).send('Error signing up lawyer');
    });
});

app.post('/lawyer/login', (req, res) => {
  const { email, password } = req.body;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      res.status(200).send('Lawyer login successful');
    })
    .catch((error) => {
      console.error('Lawyer login error:', error.message);
      res.status(401).send('Invalid credentials');
    });
});

app.post('/client/signup', (req, res) => {
  const { clientFirstName, clientLastName, clientEmail, clientPassword } = req.body;

  auth.createUserWithEmailAndPassword(clientEmail, clientPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      // Save user data to the database
      database.ref('clients/' + user.uid).set({
        firstName: clientFirstName,
        lastName: clientLastName,
        email: clientEmail
      });
      res.status(200).send('Client signed up successfully');
    })
    .catch((error) => {
      console.error('Client signup error:', error.message);
      res.status(500).send('Error signing up client');
    });
});

app.post('/client/login', (req, res) => {
  const { clientEmail, clientPassword } = req.body;

  auth.signInWithEmailAndPassword(clientEmail, clientPassword)
    .then(() => {
      res.status(200).send('Client login successful');
    })
    .catch((error) => {
      console.error('Client login error:', error.message);
      res.status(401).send('Invalid credentials');
    });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});


// import express from "express";
// import bodyParser from "body-parser";
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getDatabase } from "firebase/database";

// const firebaseConfig = {
//   apiKey: "AIzaSyBLIh3X4M7oMQaju2Li9exSvp-2iikyQfI",
//   authDomain: "login-and-signup-for-lawminds.firebaseapp.com",
//   databaseURL: "https://login-and-signup-for-lawminds-default-rtdb.firebaseio.com",
//   projectId: "login-and-signup-for-lawminds",
//   storageBucket: "login-and-signup-for-lawminds.appspot.com",
//   messagingSenderId: "153586382332",
//   appId: "1:153586382332:web:10106dbafc7cac07e26e79",
//   measurementId: "G-YCDVESSFCV"
// };

// const app = express();
// const port = 3000;

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.use(express.static('public'));

// // Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);
// const auth = getAuth(firebaseApp);
// const database = getDatabase(firebaseApp);

// // Routes
// app.post('/lawyer/signup', async (req, res) => {
//   const { firstName, lastName, email, barristerId, password } = req.body;

//   try {
//     const userCredential = await auth.createUserWithEmailAndPassword(email, password);
//     const user = userCredential.user;

//     // Save user data to the database
//     await database.ref('lawyers/' + user.uid).set({
//       firstName: firstName,
//       lastName: lastName,
//       email: email,
//       barristerId: barristerId
//     });

//     res.status(200).send('Lawyer signed up successfully');
//   } catch (error) {
//     console.error('Lawyer signup error:', error.message);
//     res.status(500).send('Error signing up lawyer');
//   }
// });

// app.post('/lawyer/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const userCredential = await auth.signInWithEmailAndPassword(email, password);
//     const user = userCredential.user;

//     res.status(200).send('Lawyer logged in successfully');
//   } catch (error) {
//     console.error('Lawyer login error:', error.message);
//     res.status(500).send('Error logging in lawyer');
//   }
// });

// app.post('/client/signup', async (req, res) => {
//   const { firstName, lastName, email, password } = req.body;

//   try {
//     const userCredential = await auth.createUserWithEmailAndPassword(email, password);
//     const user = userCredential.user;

//     // Save user data to the database
//     await database.ref('clients/' + user.uid).set({
//       firstName: firstName,
//       lastName: lastName,
//       email: email
//     });

//     res.status(200).send('Client signed up successfully');
//   } catch (error) {
//     console.error('Client signup error:', error.message);
//     res.status(500).send('Error signing up client');
//   }
// });

// app.post("/client/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const userCredential = await auth.signInWithEmailAndPassword(email, password);
//     const user = userCredential.user;

//     res.status(200).send("Client logged in successfully.");
//   } catch (error) {
//     console.error("Client login error:", error.message);
//     res.status(500).send("Error logging in client.");
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is listening at http://localhost:${port}`);
// });