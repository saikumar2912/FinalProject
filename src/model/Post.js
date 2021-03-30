const mongoose= require('mongoose');
const Schema =mongoose.Schema;

const PostSchema = new Schema({
    content:{
        type:String,
        required:true
    },
    like:{
        type:String,
        required:true
    },
    dislike:{
      type:String,
      required:true
    },
    irrevelant_content:{
        type:String,
        required:true
    },
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'user'
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
    module.exports = Post = mongoose.model('Post', PostSchema)