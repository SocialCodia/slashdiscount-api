const crypto = require('crypto');
const OtpModel  = require('../models/otp-model');

class OtpService{

    generateOtp = () => crypto.randomInt(100000,999999);

    createOtp = async (userId,type,otp) => {
        await this.removeOtp({userId});
        return await OtpModel.create({userId,type,otp});
    }

    findOtp = async filter => await OtpModel.findOne(filter);

    removeOtp = async filter => await OtpModel.deleteOne(filter);

    verifyOtp = async (userId,otp) => await OtpModel.findOne({userId,otp});

}

module.exports = new OtpService();