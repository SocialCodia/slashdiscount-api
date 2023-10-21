
class Constants{

    static BCRYPT_SALT_FACTOR = 10;
    static PASSWORD_LENGTH_MIN = 8;
    static PASSWORD_LENGTH_MAX = 50;

    //USER
    static USER_TYPE_ADMIN = 'admin';
    static USER_TYPE_VENDOR = 'vendor';
    static USER_TYPE_USER = 'user';
    
    static USER_STATUS_BANNED = 'banned';
    static USER_STATUS_VERIFIED = 'verified';

    //OTP
    static OTP_TYPE_EMAIL_VERIFICATION = 'email_verification';
    static OTP_TYPE_FORGOT_PASSWORD = 'forgot_password';
    static OTP_TYPE_DELETE_ACCOUNT = "delete_account";
    static OTP_TYPE_MOBILE_VERIFICATION = "mobile_verification"
    static OTP_VALIDITY_TIME = 35 //Time in minute

}

module.exports = Constants;