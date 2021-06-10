const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types

const AchivementSchema = new Schema({
    admin_id:{
        type: Schema.Types.ObjectId,
        ref: 'users'
},
 user_id:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    achivement:[{
        type:Schema.Types.ObjectId,
        ref: 'Post'
    }]
},{timestamps:true});
module.exports = Verification = mongoose.model('achivement',AchivementSchema)