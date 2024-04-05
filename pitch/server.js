const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 4500;

// Parse JSON bodies
app.use(bodyParser.json());

// Route to handle form submission
app.get('/submit-pitch', (req, res) => {
    const formData = req.body;
    console.log('Received pitch data:', formData);

    // Optionally, you can process the data here, such as saving it to a database

    // Send response
    res.json({ success: true, message: 'Pitch submitted successfully' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});