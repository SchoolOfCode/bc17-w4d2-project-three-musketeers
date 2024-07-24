// // Import Express Module
// const express = require('express');

//Using import instead of require
import express from "express"

// Import Helmet
import helmet from "helmet"

import activities from "./activities.json" assert { type: "json"};

const app = express();
const port = 3000;



// Create Middleware using Helmet
app.use(helmet());

// const activities = activitiesData.data

// Declare app.get with status and message

app.get('/', (req, res) => {
    res.status(200).send("Hello World");
});

//here we need some sort of error handling if the response cant be returned or their get ws crash. try success, catch fail? respond w/ obj
app.get('/activities', (req, res) => {
    res.json(activities.data);    
    })

// Declare app.get with status and message

app.get('/hello', (req, res) => {
    res.status(200).send("Hello World test2");
});

// Declare app.listen and console log message
app.listen(port, () => console.log(`App listening on port ${port}`));
