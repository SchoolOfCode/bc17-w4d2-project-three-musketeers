// // Import Express Module
// const express = require('express');

//Using import instead of require
import express from "express"

// Import Helmet
import helmet from "helmet"

import activities from "./activities.json" assert { type: "json"};

import { v4 as uuidv4 } from 'uuid';
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
//get activities from json file. returns entire array of data. if error, handle with 500 status code and error message.
app.get('/activities', (req, res) => {
    try{
        res.status(200).json(activities.data);    
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch activities' });
    }
});

//app.post to add new activity to array. error handling if needed.
//try
//catch
//request body is a .json object. post handler just adds it to array
async function addNewActivity (newActivity) {
    activities.push(newActivity);
    return newActivity;
}


app.post('/activities', async (req, res) => {
    try{
        const newActivity = await addNewActivity(req.body);
        res.status(200).json(addNewActivity);
        res.json(activities.data);
    } catch {
            res.status(500).json({ error: 'Failed to add new activities' });
    } 
});

const uniqueID = uuidv4();
console.log(uuidv4());

// Declare app.listen and console log message
app.listen(port, () => console.log(`App listening on port ${port}`));
