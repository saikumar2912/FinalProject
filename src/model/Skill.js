const mongoose= require('mongoose');
const Schema =mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types


const SkillSchema =new Schema({
    Title:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    followers:[{
        type:ObjectId,
            ref:"user"
    }]

},{timestamps:true});
module.exports = Skill = mongoose.model('skill', SkillSchema)