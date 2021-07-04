const mongoose= require('mongoose');
const Schema =mongoose.Schema;

const BitSchema = new Schema({
        title:{
        type:String,
        required:true
    },
    skill_id:{
        type:Schema.Types.ObjectId,
        ref:'skill'
    }
    },{timestamps:true})
    module.exports = Bit = mongoose.model('bit', BitSchema)