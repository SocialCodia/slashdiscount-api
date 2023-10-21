const transporter = require('../configs/mail-config');
const  mailTemplate = require('../templates/mail-template');

class MailService{

    sendVerificationEmail = async (name,email,otp) =>{
        const {subject,body} = mailTemplate.templateEmailVerification(name,otp);
        return await this.sendMail(email,subject,body);
    }

    sendMail = async (to,subject,body) =>{
        const mailOption = {
            from : process.env.MAIL_USER,
            to,
            subject,
            text:body
        };
        console.log(mailOption)
        return await transporter.sendMail(mailOption);
    }

}

module.exports = new MailService();