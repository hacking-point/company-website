const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const User = require("../models/user");
require("dotenv").config();

module.exports = async (user, buttonText) => {
  try {
    

    const emailDomain = user.email.split("@")[1];
    
    let transporter;

    if (emailDomain === "hackingpoint.com") {
      transporter = await nodemailer.createTransport({
        host: process.env.OWN_MAIL_HOST,
        port: parseInt(process.env.OWN_MAIL_PORT, 10), 
        secure: true, 
        auth: {
          user: process.env.OWN_MAIL_USER, 
          pass: process.env.OWN_MAIL_PASS, 
        },
      });
    } else {
      transporter = await nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
          user: process.env.GMAIL_USER, 
          pass: process.env.GMAIL_PASS, 
        },
      });
    }

    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Hacking Point",
        link: process.env.URL, 
      },
    });

    const emailContent = {
      body: {
        name: user.username, 
        intro: "Welcome to Hacking Point! We're very excited to have you on board.",
        action: {
          instructions: "To get started with our service, please click here:",
          button: {
            color: "#22BC66", 
            text: buttonText, 
            link: process.env.URL
          },
        },
        outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };

    const emailBody = mailGenerator.generate(emailContent);
    const emailText = mailGenerator.generatePlaintext(emailContent);

    const info = await transporter.sendMail({
      from: emailDomain === "hackingpoint.com" ? process.env.OWN_MAIL_FROM : process.env.GMAIL_FROM,
      to: user.email, 
      subject: "Hacking Point - Welcome!",
      text: emailText, 
      html: emailBody, 
    });

    if (info.messageId) {
      return {
        message: `Email sent successfully on ${user.email}`,
        
        
        
      };
    }
  } catch (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }
};