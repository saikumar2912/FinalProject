const express = require('express');
const mongoose = require('mongoose');

const users = require('./routers/user.js');
const skill =require('./routers/skill');
const bit =require('./routers/bit');
//const bodyParser = require("body-parser");
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