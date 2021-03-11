const mongoose= require('mongoose');
const Schema =mongoose.Schema;

const BitSchema = new Schema({
        title:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    skillId:{
        type:Schema.Types.ObjectId,
        ref:'skill'
    }
    })
    module.exports = Bit = mongoose.model('bit', BitSchema)