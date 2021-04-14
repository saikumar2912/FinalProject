const mongoose= require('mongoose');
const Schema =mongoose.Schema;

const UserSchema= new Schema({
    user_name:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:false
    },
    email_id:{
        type:String,
        required:false
     },
    phoneNo:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:false
    },
    password2:{
        type:String,
        required:false
    },

});
module.exports = User = mongoose.model('user', UserSchema)