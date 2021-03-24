const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()

const users = require('./Routers/user.js');
const skill =require('./Routers/skill');
const bit =require('./Routers/bit');
const admin= require('./Routers/admin');
const post= require('./Routers/post.js');
const db = "mongodb+srv://saikumar2912:saikumar@cluster0.6llhp.mongodb.net/Explore?retryWrites=true&w=majority"

const PORT=process.env.PORT || 6000;
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
app.use('/admin',admin)
app.use('/post',post)


app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`));