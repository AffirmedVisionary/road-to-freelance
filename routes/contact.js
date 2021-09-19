import express from 'express'
import nodemailer from 'nodemailer'
import subscribing from "../config/subscribing.js";

const router = express.Router()
//routes
router.post('/', async (req, res) => {
  const { firstName, lastName, email, content, newsletter } = req.body

  const output = `
  <p>You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>
    <li>Name: ${firstName} ${lastName}</li>
    <li>Email: ${email}</li>
  </ul>
  <h3>Message</h3>
  <p>${content}</p>
  `

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.NODEMAILER_AUTH_USER, // generated ethereal user
      pass: process.env.NODEMAILER_AUTH_PASS // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  // setup email data with unicode symbols
  let mailOptions = {
    from: email, // sender address
    replyTo: email,
    to: process.env.NODEMAILER_RECIEVER, // list of receivers
    subject: `Message from ${firstName}`, // Subject line
    text: content, // plain text body
    html: output // html body
  }

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
    console.log(mailOptions)
    console.log('Message sent: %s', info.messageId)

    return res.status(201).json({ message: 'Email Sent successfully' })
  })

  // subscribe to mailchimp newsletter
  subscribing(firstName, lastName, email, newsletter)

})

export default router
