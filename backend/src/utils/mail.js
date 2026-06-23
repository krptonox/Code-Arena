import Mailgen from "mailgen";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();


const sendMail = async (Email, Subject, Text, Content) => {
const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: Number(process.env.MAILTRAP_SMTP_PORT),
        auth:{
            user: process.env.MAILTRAP_SMTP_USERNAME,
            pass: process.env.MAILTRAP_SMTP_PASSWORD
        }
    });

const mailGenerator = new Mailgen({
    theme: 'default',
    product:{
        name:'Mailgen',
        link:'https://mailgen.js/'
    }
})

const emailBody = mailGenerator.generate(Content);

const emailText = mailGenerator.generatePlaintext(Content);

const mail = {
    from:"krptonox@gmail.com",
    to:Email,
    subject:Subject,
    text:emailText,
    html:emailBody
}
  
try {
    console.log("Sending email to:", Email);
    await transporter.sendMail(mail);
    console.log("Email sent:", info.messageId);
} catch (error) {
    throw new Error(`Failed to send email: ${error.message}`);
}

}



const emailVerificationTemplate = (username, verificationurl) => {
   return {
         body:{
                name: username,
                intro: 'Welcome to Dekan! We\'re very excited to have you on board.',
                action:{
                    instruction:'To verify your email, please click the button below:',
                    button:{
                        color:'#22BC66',
                        text:'Verify Email',
                        link: verificationurl
                    }
                },
                outro:'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }
   }
}

export { sendMail, emailVerificationTemplate };