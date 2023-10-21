
class MailTemplate{

    templateEmailVerification = (name,otp) => {
        const subject = `Verify Your Account For ${process.env.APP_NAME}`;
        const body = `Hi ${name}, \nUse this otp to verify your Email ${otp}`;
        return {subject,body};
    }

}

module.exports = new MailTemplate();