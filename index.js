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

app.get('/activities', (req, res) => {
    res.status(200).send({
        data: [
            {
                "id": "54321234", // UUID
                "activity_submitted": "1719486190058", // simple Epoc timestamp (Date.now() in JS)
                "activity_type": "run", // choose some standard types
                "activity_duration": "30", // choose standard unit type (minutes probably)
            }, // activity object
            {
                "id": "54321567", // UUID
                "activity_submitted": "1719486190060", // simple Epoc timestamp (Date.now() in JS)
                "activity_type": "swim", // choose some standard types
                "activity_duration": "45" // choose standard unit type (minutes probably)
            }, // activity object
            {
                "id": "54321890", // UUID
                "activity_submitted": "1719486190062", // simple Epoc timestamp (Date.now() in JS)
                "activity_type": "bike", // choose some standard types
                "activity_duration": "60" // choose standard unit type (minutes probably)
            } // activity object
        ]
    })
})



// Declare app.listen and console log message
app.listen(port, () => console.log('Hello World to Console'))