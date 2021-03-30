const mongoose= require('mongoose');
const Schema =mongoose.Schema;

const MiddleSchema = new Schema({
    skill_id:{
        type:Schema.Types.ObjectId,
        ref:'skills'
    },
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    admin_id:{
        type:Schema.Types.ObjectId,
        ref:'admins'
    }
    })
    module.exports = Middle = mongoose.model('middle', MiddleSchema)