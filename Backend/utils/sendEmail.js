import nodemailer from "nodemailer"
// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async function (email, subject, message) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.smtp_host,
      port: process.env.smtp_port,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.smtp_username,
        pass: process.env.smtp_pass,
      },
    });
  
    // send mail with defined transport object
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL, // sender address
      to: email, // user email
      subject: subject, // Subject line
      html: message, // html body
    });
  };
  
  export default sendEmail;