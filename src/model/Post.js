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
    ref:"user",

}
],
    dislike:[{
        type:ObjectId,
    ref:"user"
    }],

  popularity:{
    type:Number,
    default:0   
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
    },
    
    },{timestamps:true});

    PostSchema.pre('save', function (next) {
       
        this.popularity=this.like.length*(+1)+this.dislike.length*(-2)

        next();
      })


    module.exports = Post = mongoose.model('post', PostSchema)