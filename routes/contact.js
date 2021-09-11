const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer')

//routes
router.post("/", async (req, res) => {

  const output = `
  <p>You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
  </ul>
  <h3>Message</h3>
  <p>${req.body.content}</p>
  `

    // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.NODEMAILER_AUTH_USER, // generated ethereal user
        pass: process.env.NODEMAILER_AUTH_PASS  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: req.body.email, // sender address
      replyTo: req.body.email,
      to: process.env.NODEMAILER_RECIEVER, // list of receivers
      subject: 'Node Contact Request', // Subject line
      text: req.body.content, // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);

      res.render('contact', {msg:'Email has been sent'});
  });
})

module.exports = router;
