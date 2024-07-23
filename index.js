// // Import Express Module
// const express = require('express');

//Using import instead of require
import express from "express"

// Import Helmet
import helmet from "helmet"

const app = express();
const port = 3000;



// Create Middleware using Helmet
app.use(helmet());

// Declare app.get with status and message
app.get('/', (req, res) => {
    res.status(200).send("Hello World")
})

// Declare app.listen and console log message
app.listen(port, () => console.log('Hello World to Console'))