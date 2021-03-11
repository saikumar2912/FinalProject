const mongoose= require('mongoose');
const Schema =mongoose.Schema;

const SkillSchema =new Schema({
    Title:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },

});
module.exports = Skill = mongoose.model('Skill', SkillSchema)