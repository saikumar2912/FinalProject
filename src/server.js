const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
// const bodyParser=require('body-parser');
const users = require('./Routers/user.js');
const skill = require('./Routers/skill');
const bit = require('./Routers/bit');
const post = require('./Routers/post.js');
const achive=require('./Routers/achivement')
const report=require('./Routers/report')
const verify=require('./Routers/verification')
const quiz=require('./Routers/quiz')
const results=require('./Routers/results')

require('dotenv').config();
let port = process.env.PORT;
let db=process.env.DB;

const app = express();
app.use(express.json());
app.use(cors());

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
app.use('/post',post);
app.use('/achivement',achive);
app.use('/report',report)
app.use('/verify',verify)
app.use('/quiz',quiz)
app.use('/result',results)


app.listen(port, () =>
    console.log(`Server running on port ${port}`));