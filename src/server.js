const express = require('express');
const mongoose = require('mongoose');

const users = require('../src/routers/user.js');
const db = "mongodb+srv://saikumar2912:saikumar@cluster0.6llhp.mongodb.net/Explore?retryWrites=true&w=majority"

const port = 6000;
const app = express();


app.use(express.json());

mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => {
        console.log('MongoDB Connnected');
    })
    .catch((err) => {
        console.log({ err: err });
    });

app.use('/users', users);

app.listen(port, () =>
    console.log('Server running on port ' + port));