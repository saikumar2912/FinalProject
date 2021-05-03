const mongoose= require('mongoose');
const Schema =mongoose.Schema;

const PostSchema = new Schema({
    content:{
        type:String,
        required:true
    },
    like:{
        type:Number,
        default:0    
},
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
        required:false
    },
    skill_id:{
        type:Schema.Types.ObjectId,
        ref:'skill'
    },
    skill_title:{
        type:String,
        required:false
    },
    bit_id:{
        type:Schema.Types.ObjectId,
        ref:'bit'
    },
    bit_title:{
        type:String,
        required:false
    },
    })
    module.exports = Post = mongoose.model('Post', PostSchema)