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

const activties2 = {
    "data": [
    {
        "id": "1", 
        "activity_submitted": "4", 
        "activity_type": "run", 
        "activity_duration": "30"
    }, 
    {
        "id": "2", 
        "activity_submitted": "5", 
        "activity_type": "swim", 
        "activity_duration": "45" 
    },
    {
        "id": "3", 
        "activity_submitted": "6", 
        "activity_type": "bike", 
        "activity_duration": "60"
    }
]
}

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
        error: 'Invalid request format. Ensure activity_type is a string .'
       });
    };

//|| isNaN(activity_duration)   and activity_duration is a number

    activities.data.push(newActivity);
    res.status(201).json(newActivity);
});

console.log(typeof activties2.data.activity_type) 
//Given I am a developer who has made an invalid POST request by missing a required request body field like, activity_type or activity_duration,
//When I inspect the API response,
//Then the request should fail, responding with the correct status code and a clear error message (response.error).
//detect if request body is missing a required field
//required fields are activity_type and activity_duration
//also need to detect if req body is in json format
// if missing activity type, respond error and also specify which field is missing. so different error messages for different missing fields

    

// app.post('/activities', (req, res) => { 
//     const newActivity = req.body;
//     newActivity.id = uuidv4();
//     newActivity.activity_submitted = Date.now();
//     activities.push(newActivity);
//     res.status(200).json({
//         message: 'New activity added',
//         data: newActivity
//     });
// }



//app.post to add new activity to array. error handling if needed.
//try
//catch
//request body is a .json object. post handler just adds it to array
// async function addNewActivity (newActivity) {
//     activities.push(newActivity);
//     return newActivity;
// }


// app.post('/activities', async (req, res) => {
//     try{
//         const newActivity = await addNewActivity(req.body);
//         res.status(200).json({
//             message: 'New activity added',
//             data: newActivity
//         });
//     } catch {
//             res.status(500).json({ error: 'Failed to add new activities' });
//     } 
// });

// Declare app.listen and console log message
app.listen(port, () => console.log(`App listening on port ${port}`));
