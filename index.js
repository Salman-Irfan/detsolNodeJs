const express = require("express");
const connectToMongodb = require('./config/db');
const cors = require("cors");
connectToMongodb();
const dotenv = require('dotenv')

dotenv.config()

const app = express();
const PORT = process.env.PORT || 8000;
// Middleware to parse JSON data from requests
app.use(express.json());
// add middleware to parse form data instead of JSON
app.use(express.urlencoded({extended: true}));

// use a static folder
app.use(express.static('public'))
app.use(cors());

// available routes
// Use the base route from /routes/index.js
app.use('/', require('./routes'));

// liseten server to port
app.listen(PORT, () => {
    console.log(`Example app listening on http://localhost:${PORT}`);
});