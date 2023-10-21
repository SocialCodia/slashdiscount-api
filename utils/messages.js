
class Messages{


    static NO_USER_FOUND = 'No User Found';

    //PASSWORD
    static PASSWORD_INVALID = "Invlid Password"
    
    //ACCOUNT
    static ACCOUNT_NOT_FOUND = "No User Found";
    static ACCOUNT_CREATED = 'A Verification Link has been sent to your Email Address';
    static ACCOUNT_CREATION_FAILED = 'Failed to create an Account';
    static ACCOUNT_STATUS_BANNED = "Your account has been banned";

    //EMAIL
    static EMAIL_ALREADY_VERIFIED = 'Email Already Verified';
    static EMAIL_VERIFICATION_PENDING = "Email verification Pending";
    static EMAIL_VERIFICATION_SUCCEED = "Your Account Has Been Verified";
    static EMAIL_VERIFICATION_FAILED = "Failed to verify your Account";

    //OTP
    static OTP_INVALID = 'Invalid OTP';
    static OTP_EXPIRED = 'Otp has been Expired';
    static OTP_SENT_FAILED = "Failed to send an otp";
    static OTP_SENT = "Otp has been sent";

}

module.exports = Messages;