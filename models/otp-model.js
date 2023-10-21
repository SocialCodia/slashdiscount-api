const mongoose = require('mongoose');
const Constants = require('../utils/constatns');

const Schema = mongoose.Schema;

const otpSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    otp:{
        type:String,
    },
    type:{
        type:String,
        enum:[Constants.OTP_TYPE_EMAIL_VERIFICATION,Constants.OTP_TYPE_FORGOT_PASSWORD,Constants.OTP_TYPE_DELETE_ACCOUNT,Constants.OTP_TYPE_MOBILE_VERIFICATION,],
        default:Constants.OTP_TYPE_EMAIL_VERIFICATION
    }
},{
timestamps:true,
});


module.exports = mongoose.model('Otp',otpSchema,'otps');