const express = require('express');
const mongoose = require('mongoose');

const users = require('../src/routers/user.js');
const skill =require('../src/routers/skill');
const bit =require('../src/routers/bit');
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
app.use('/skill',skill);
app.use('/bit',bit);

app.listen(port, () =>
    console.log('Server running on port ' + port));