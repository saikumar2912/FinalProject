const mongoose= require('mongoose');
const Schema =mongoose.Schema;

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
    }

});
module.exports = User = mongoose.model('user', UserSchema)