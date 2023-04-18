import nodemailer from "nodemailer";
import { logError } from "../../util/logging.js";

export const emailSender = async (options) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    secure: false,
    port: "587",
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },
    auth: {
      user: process.env.EMAIL_365,
      pass: process.env.EMAIL_PASSWORD,
    },
    pool: true,
    // host: "smtp.gmail.com",
    // port: 465,
    // secure: true, // true for 465, false for other ports
    // auth: {
    //   type: "OAuth2",
    //   clientId: process.env.CLIENT_ID,
    //   clientSecret: process.env.CLIENT_SECRET,
    //   accessToken: process.env.GMAIL_ACCESS_TOKEN,
    //   refreshToken: process.env.GMAIL_REFRESH_TOKEN,

    // user: process.env.GMAIL_USER, // generated ethereal user
    // pass: process.env.GMAIL_PASSWORD, // generated ethereal password
    // },
  });
  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
  try {
    // send mail with defined transport object

    let info = await transporter.sendMail({
      from: options?.from, // sender address
      to: options?.to, // "bar@example.com, baz@example.com",   list of receivers
      subject: options?.subject, //"Hello ✔", // Subject line
      text: options?.text, //"Hello world?", // plain text body
      html: options?.html, //"<b>Hello world?</b>", // html body
      amp: options?.amp,
    });
    // const mailOptions = {
    //   from: options?.from, // sender address
    //   to: options?.to, // "bar@example.com, baz@example.com",   list of receivers
    //   subject: options?.subject, //"Hello ✔", // Subject line
    //   text: options?.text, //"Hello world?", // plain text body
    //   html: options?.html, //"<b>Hello world?</b>", // html body
    //   amp: options?.amp,
    // };

    // new Promise((resolve, reject) => {
    //   transporter.sendMail(mailOptions, function (error, response) {
    //     if (error) {
    //       reject(error);
    //     } else {
    //       resolve("email sent");
    //     }
    //   });
    // });
    return info;
    // console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  } catch (error) {
    logError(error);
  }
};
