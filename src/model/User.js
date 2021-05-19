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


});
module.exports = User = mongoose.model('user', UserSchema)