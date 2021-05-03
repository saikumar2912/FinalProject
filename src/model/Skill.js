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
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    followers:[{type:ObjectId,ref:"user"}],

});
module.exports = Skill = mongoose.model('Skill', SkillSchema)