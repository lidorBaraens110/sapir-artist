const express = require('express');
const app = express();
require('dotenv').config();

var AWS = require('aws-sdk');


app.use(express.static('client/build'));
// let the react app to handle any unknown routes 
// serve up the index.html if express does'nt recognize the route
const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.get('/enrolledPage', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.get('/client', (req, res) => {

    console.log('client');
    let message = `שלום ${req.query.name}
פרטייך התקבלו בהצלחה לתשלום וסיום ההרשמה אצור עמך קשר בהקדם`
    console.log("Name = " + req.query.name);
    console.log("Number = " + req.query.number);
    console.log("Subject = " + req.query.subject);
    var params = {
        Message: message,
        PhoneNumber: '+972' + req.query.number,
        MessageAttributes: {
            'AWS.SNS.SMS.SenderID': {
                'DataType': 'String',
                'StringValue': 'SapirCourse'
            }
        }
    };

    var publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' })
        .publish(params).promise();

    publishTextPromise.then(
        function (data) {
            res.end(JSON.stringify({ MessageID: data.MessageId }));
        }).catch(
            function (err) {
                res.end(JSON.stringify({ Error: err }));
            });
});


app.get('/managerpersonal', (req, res) => {
    console.log('managerpersonal')

    let message = `שלום ספיר
    ${req.query.lastname} ${req.query.name}
    נרשמה לסדנא אישית צרי עמה קשר בהקדם טלפון: ${req.query.number}`
    console.log("Name = " + req.query.name);
    console.log("Number = " + req.query.number);
    console.log("counter = " + req.query.lastname);
    var params = {
        Message: message,
        PhoneNumber: '+972' + '546310022',
        MessageAttributes: {
            'AWS.SNS.SMS.SenderID': {
                'DataType': 'String',
                'StringValue': 'DIYBySapir'
            }
        }
    }


    var publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' })
        .publish(params).promise();

    publishTextPromise.then(
        function (data) {
            res.end(JSON.stringify({ MessageID: data.MessageId }));
        }).catch(
            function (err) {
                res.end(JSON.stringify({ Error: err }));
            });

});

app.get('/managergroup', (req, res) => {
    let message = `שלום ספיר
    ${req.query.lastname} ${req.query.name}
    נרשמה לסדנא בקבוצות צרי עמה קשר בהקדם טלפון: ${req.query.number}
    מספר המשתתפים הוא ${req.query.counter}`
    console.log("Name = " + req.query.name);
    console.log("Number = " + req.query.number);
    console.log("counter = " + req.query.counter);
    var params = {
        Message: message,
        PhoneNumber: '+972' + '546310022',
        MessageAttributes: {
            'AWS.SNS.SMS.SenderID': {
                'DataType': 'String',
                'StringValue': 'DIYBySapir'
            }
        }
    }


    var publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' })
        .publish(params).promise();

    publishTextPromise.then(
        function (data) {
            res.end(JSON.stringify({ MessageID: data.MessageId }));
        }).catch(
            function (err) {
                res.end(JSON.stringify({ Error: err }));
            });

});
const PORT = process.env.PORT || 5000;
console.log('server started on port:', PORT);
app.listen(PORT);