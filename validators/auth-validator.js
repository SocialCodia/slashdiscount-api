const Joi = require('@hapi/joi');
const Constants = require('../utils/constatns');
const Messages = require('../utils/messages');

class AuthValidator{

    register = Joi.object({
        name:Joi.string().min(4).max(30).required(),
        email: Joi.string().email().lowercase().required(),
        password:Joi.string().min(8).max(50).required()
    });
    verify = Joi.object({
        email:Joi.string().email().lowercase().required(),
        otp:Joi.string().min(6).max(6).required(),
        type:Joi.string()
        .valid(Constants.OTP_TYPE_EMAIL_VERIFICATION,Constants.OTP_TYPE_FORGOT_PASSWORD,Constants.OTP_TYPE_DELETE_ACCOUNT,Constants.OTP_TYPE_MOBILE_VERIFICATION)
        .default(Constants.OTP_TYPE_EMAIL_VERIFICATION)
    });

    login = Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().required().min(Constants.PASSWORD_LENGTH_MIN).max(Constants.PASSWORD_LENGTH_MAX).messages({
            'string.min':Messages.PASSWORD_INVALID
        })
    });

    resend = Joi.object({
        email:Joi.string().email().required(),
    });

}

module.exports = new AuthValidator();