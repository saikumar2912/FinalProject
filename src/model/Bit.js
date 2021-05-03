const mongoose= require('mongoose');
const Schema =mongoose.Schema;

const BitSchema = new Schema({
        title:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:false
    },
    skill_id:{
        type:Schema.Types.ObjectId,
        ref:'skills'
    }
    })
    module.exports = Bit = mongoose.model('Bit', BitSchema)