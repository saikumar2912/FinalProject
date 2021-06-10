const mongoose= require('mongoose');
const Schema =mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types

const UserSchema= new Schema({
    user_name:{
        type:String,
        required:true
    },
    email_id:{
        type:String,
        required:true
     },
    phoneNo:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user"
    },
    profile_picture:{
        type:String,
        required:false,
        default:""
    },
    Education:{
        type:String,
        required:false,
        default:"Not Mentioned"
    },
    Bio:{
        type:String,
        required:false,
        default:"Not Mentioned"
    },


},{timestamps:true});
module.exports = User = mongoose.model('user', UserSchema)