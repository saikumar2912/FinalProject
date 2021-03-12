const mongoose= require('mongoose');
const Schema =mongoose.Schema;

const SkillSchema =new Schema({
    userId:{
         type:Schema.Types.ObjectId,
        ref:'explore'
    },
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