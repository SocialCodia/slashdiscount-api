const userService = require('../services/user-service');
const authValidator = require('../validators/auth-validator');
const ErrorHandler = require('../utils/error-handler');
const otpService = require('../services/otp-service');
const Constants = require('../utils/constatns');
const mailService = require('../services/mail-service');
const Messages = require('../utils/messages');
const { response } = require('express');
const tokenService = require('../services/token-service');

class AuthController {

    register = async (req,res,next) =>{
        const body = await authValidator.register.validateAsync(req.body);
        const data = await userService.createUser(body);
        if (!data) return next(ErrorHandler.serverErrror(Messages.ACCOUNT_CREATION_FAILED));
        const otp = otpService.generateOtp();
        await otpService.createOtp(data._id,Constants.OTP_TYPE_EMAIL_VERIFICATION,otp);
        await mailService.sendVerificationEmail(data.name,data.email,otp);
        return res.json({success:true,message:Messages.ACCOUNT_CREATED})
    }

    verify = async (req,res,next) =>{
        const body = await authValidator.verify.validateAsync(req.body);
        const user = await userService.findUser({email:body.email});
        console.log(user)
        if (!user) return next(ErrorHandler.notFound(Messages.NO_USER_FOUND));
        if (user.isEmailVerified) return next(ErrorHandler.badRequest(Messages.EMAIL_ALREADY_VERIFIED));
        const resOtp = await otpService.verifyOtp(user._id,body.otp);
        if (!resOtp) return next(ErrorHandler.badRequest(Messages.OTP_INVALID))
        let fiveMinute = new Date();
        fiveMinute.setMinutes(fiveMinute.getMinutes() - Constants.OTP_VALIDITY_TIME);
        if(fiveMinute >  resOtp.createdAt) return next(ErrorHandler.notAuthorized(Messages.OTP_EXPIRED));
        const data = await userService.updateUser({_id:user._id,},{isEmailVerified:true});
        if (!data) return next(ErrorHandler.serverErrror());
        await otpService.removeOtp({userId:user._id});
        return res.json({success:true,message:Messages.EMAIL_VERIFICATION_SUCCEED});
    }


    login = async (req,res,next) =>{
        const body = await authValidator.login.validateAsync(req.body);
        const user = await userService.findUser({email:body.email});
        if (!user) return next(ErrorHandler.notFound(Messages.NO_USER_FOUND));
        if (!user.isEmailVerified) return next(ErrorHandler.notAuthorized(Messages.EMAIL_VERIFICATION_PENDING));
        if (user.status==Constants.USER_STATUS_BANNED) return next(ErrorHandler.notAuthorized(Messages.ACCOUNT_STATUS_BANNED))
        const {accessToken,refereshToken } = tokenService.generateToken(user);
    }

    resend = async (req,res,next) =>{
        const body = await authValidator.resend.validateAsync(req.body);
        const user = await userService.findUser({email:body.email});
        if(!user) return next(ErrorHandler.notFound(Messages.NO_USER_FOUND));
        if (user.isEmailVerified) return next(ErrorHandler.badRequest(Messages.EMAIL_ALREADY_VERIFIED));
        const otp = otpService.generateOtp();
        const otpRes = await otpService.createOtp(user._id,Constants.OTP_TYPE_EMAIL_VERIFICATION,otp);
        if (!otpRes) return next(ErrorHandler.serverErrror(Messages.OTP_SENT_FAILED));
        const isEmailSent = await mailService.sendVerificationEmail(user.name,body.email,otp);
        return isEmailSent ? res.json({success:true,message:Messages.OTP_SENT}) : next(ErrorHandler.serverErrror(Messages.OTP_SENT_FAILED));
    }

}

module.exports = new AuthController();