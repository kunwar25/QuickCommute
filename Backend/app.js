const dotenv = require('dotenv');
dotenv.config();


const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());    // Allow CORS


app.get('/', (req, res) => {    
    res.send('Hello World');
});
const connectToDb = require('./db/db')

connectToDb();
module.exports = app;