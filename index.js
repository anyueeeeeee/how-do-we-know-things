let answerTracker = [];

import express from 'express';
let app = express();

import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

//connect to the DB
const defaultData = { answerTrackerData: [] };
const adapter = new JSONFile('db.json');
const db = new Low(adapter, defaultData);

app.use(express.static('public'));
app.use(express.json());

//add a route on server to listen for POST request
app.post('/knowthings', (request, response) => {
    console.log(request.body);
    let currentDate = Date();
    let obj = {
        date: currentDate,
        answer: request.body.answer
    }

    // answerTracker.push(obj);
    // console.log(answerTracker);
    //add value to the DB
    db.data.answerTrackerData.push(obj);
    db.write()
        .then(() => {
            response.json({ task: "success" });
        })
})

let port = process.env.PORT || 3000; //environmental variable for port
app.listen(port, () => {
    console.log('Server listening on localhost:', port);
});

//add route for all answers
app.get('/getAnswers', (request, response) => {
    // let obj = { data: answerTracker };
    //fetch values from DB 
    db.read()
        .then(() => {
            let obj = {data: db.data.answerTrackerData} 
            response.json(obj);
        })
})

app.post('/knowthings', (request, response) => {
    // console.log(request.body);
    let obj = request.body; 
    obj.time = Date(); 
  
    //13. add new message to the answerTracker array
    answerTracker.push(obj);
    // console.log(obj);
  });