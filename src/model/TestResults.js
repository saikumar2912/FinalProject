const mongoose= require('mongoose');
const Schema =mongoose.Schema;

const TestSchema = new Schema({
  
    no_of_attempts:{
              type:String,
              default:0
    },
    score:{
        type:Number,
        required:true
    },
    skill_id:{
        type:Schema.Types.ObjectId,
        ref:'skill'
    },
    bit_id:{
            type:Schema.Types.ObjectId,
            ref:'bit'
    },
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }
    },{timestamps:true})
    module.exports = Test = mongoose.model('testresult', TestSchema)