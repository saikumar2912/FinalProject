const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    post_id:{
type:Schema.Types.ObjectId,
ref:"post"
    },
    reportlike:[{
        type:Schema.Types.ObjectId,
        ref:"user"
            }],
    reportdislike:[{
         type:Schema.Types.ObjectId,
        ref:"user"
           }],
    report:{
        type:String,
        required:true
    }
},{timestamps:true});
module.exports = Report = mongoose.model('report',ReportSchema)