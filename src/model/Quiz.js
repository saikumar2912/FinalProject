const mongoose= require('mongoose');
const Schema =mongoose.Schema;

const QuizSchema = new Schema({
     

        question:{
        type:String,
        required:true
    },
    option1:{
        type:String,
        required:true
    },
    option2:{
        type:String,
        required:true
    },
    option3:{
        type:String,
        required:true
    },
    option4:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
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
    module.exports = Quiz = mongoose.model('quiz', QuizSchema)