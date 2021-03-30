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
    user_id:{
        type:Schema.Types.ObjectId,
        ref:"users"
    },
    admin_id:{
        type:Schema.Types.ObjectId,
        ref:"admins"
    }


});
module.exports = Skill = mongoose.model('Skill', SkillSchema)