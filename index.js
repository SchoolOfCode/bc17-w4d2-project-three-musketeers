// // Import Express Module
// const express = require('express');

//Using import instead of require
import express from "express"

// Import Helmet
import helmet from "helmet"
//Import activities.json file
import activities from "./activities.json" assert { type: "json"};
//import uuidv4 from 'uuidv4' to make unique id for each activity;
import { v4 as uuidv4 } from 'uuid';
// Create express app
const app = express();
// Declare port 3000
const port = 3000;

// Create Middleware using Helmet
app.use(helmet());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Task 1 - Declare app.get with status and message
app.get('/', (req, res) => {
    res.status(200).send("Hello World");
});
//Task 3 - Get request to /activities. Returns entire array of data. If error, handle with 500 status code and error message.
app.get('/activities', (req, res) => {
    try{
        res.status(200).json(activities.data);    
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch activities' });
    }
});
//Task 4 - Post request to /activities. Adds new activity to array. If error, handle with 500 status code and error message.
//When I make a POST request to “http://localhost:3000/activities” with a request body containing a JSON object (new activity). the req body will have the following properties: “activity_type" and "activity_duration”."
//Then the API should save the new activity to the activities.json file giving it a unique “id” (UUID) and activity_submitted (time stamp - Date.now()),
//Then the the request should succeed, responding with the correct status code and the activity object that I posted as the response body (response.data).
//detect if request body is missing a required field
//required fields are activity_type and activity_duration
//also need to detect if req body is in json format
// if missing activity type, respond error and also specify which field is missing. so different error messages for different missing fields
app.post('/activities', (req, res) => {
    const id = uuidv4();
    const activity_submitted = Date.now();
    const newActivity = {
        id,
        activity_submitted,
        ...req.body
    };  
    if (!newActivity.activity_type){
        res.status(400).json({ error: 'Failed because activity_type is required' });
    }; 
    if (!newActivity.activity_duration){
        res.status(400).json({ error: 'Failed because activity_duration is required' });
    }; 
    if (typeof newActivity.activity_type !== 'string') {
       return res.status(400).json({
        error: 'Invalid request format. Ensure activity_type is a string .'});
    };
    if (typeof newActivity.activity_duration !== "number")  {
        return res.status(400).json({
            error: 'Invalid request format. Ensure activity_duration is a number .'
        });
    };

//|| isNaN(activity_duration)   and activity_duration is a number

    activities.data.push(newActivity);
    res.status(201).json(newActivity);
});

// Task 5 - When I make a DELETE request to “http://localhost:3000/activities/activity_id_here”
// Then the API should delete the activity that has a matching activity id in the activities.json file,
// Then the request should succeed, responding with the correct status code and the deleted activity object in the response body (response.data).
// Given I am a developer who has made an invalid DELETE request by specifying an id for a activity that does not exist,
// When I inspect the API response,
// Then the the API call should fail with the correct response code and a clear error message (response.error).
//activities.json file contains an array called data with key value pairs - need to target id in array
//need an if handler for if find = undefined, this means the id searched does not exist
//more real world - specifying error handling for bad request parameter / endpoint

app.delete(`/activities/:id` , (req , res ) => {
    const id = req.params.id;
    const indexPosition = activities.data.findIndex((item) => item.id === id);

    if (indexPosition === -1) {
        return res.status(404).json({
            error: (`Cannot find activity with ID ${id}.`)
        });
    }
    const deletedActivity = activities.data.splice(indexPosition, 1,);
    return res.status(200).json(deletedActivity);
    });  

// Declare app.listen and console log message
app.listen(port, () => console.log(`App listening on port ${port}`));
