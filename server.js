const express = require('express');
const path = require('path');
const app = express();

// Use the port provided by Render, or default to 3000 for local testing
const PORT = process.env.PORT || 3000;

// Serve all static files in the current folder (index.html, style.css, script.js, images, PDFs)
app.use(express.static(__dirname));

// Fallback to index.html for any undefined routes (e.g. standard routing or 404 handling)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running and serving portfolio on port ${PORT}`);
});
