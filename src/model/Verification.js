const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types

const VerificationSchema = new Schema({
    admin_id:{
        type: Schema.Types.ObjectId,
        ref: 'user'
},
 user_id:{
        type: Schema.Types.ObjectId,
        required:true,
        ref: 'user'
    },
    status:{
        type:String,
        required:true,
        default:"notVerified"
    }
},{timestamps:true});
module.exports = Verification = mongoose.model('verification',VerificationSchema)