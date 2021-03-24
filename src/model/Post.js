const mongoose= require('mongoose');
const Schema =mongoose.Schema;

const PostSchema = new Schema({
    Description:{
        type:String,
        required:true
    },
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'explore'
    },
    skill_id:{
        type:Schema.Types.ObjectId,
        ref:'skill'
    },
    bit_id:{
        type:Schema.Types.ObjectId,
        ref:'bit'
    }
    })
    module.exports = Bit = mongoose.model('Post', PostSchema)