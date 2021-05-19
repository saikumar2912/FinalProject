const mongoose= require('mongoose');
const Schema =mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types

const PostSchema = new Schema({
    content:{
        type:String,
        required:true
    },
like:[{
    type:ObjectId,
    ref:"user"
}],
    dislike:[{
        type:ObjectId,
    ref:"user"
    }],
    irrevelant_content:[{
        type:ObjectId,
    ref:"user"
    }],
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
    },
    
    })
    module.exports = Post = mongoose.model('Post', PostSchema)