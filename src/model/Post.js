const mongoose= require('mongoose');
const Schema =mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types

const PostSchema = new Schema({
    content:{
        type:String,
        required:true
    },
        likes:[{type:ObjectId,ref:"user"}],

    dislike:{
        type:Number,
        default:0 
    },
    irrevelant_content:{
        type:Number,
        default:0 
    },
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    user_name:{
        type:String,
        required:true
    },
    skill_id:{
        type:Schema.Types.ObjectId,
        ref:'skill'
    },
    skill_title:{
        type:String,
        required:true
    },
    bit_id:{
        type:Schema.Types.ObjectId,
        ref:'bit'
    },
    bit_title:{
        type:String,
        required:true
    },
    })
    module.exports = Post = mongoose.model('Post', PostSchema)