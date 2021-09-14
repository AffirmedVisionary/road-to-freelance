const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const request = require('request')
const https = require('https')

//routes
router.post('/', async (req, res) => {
  const output = `
  <p>You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>
    <li>Name: ${req.body.firstName} ${req.body.lastName}</li>
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
      pass: process.env.NODEMAILER_AUTH_PASS // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  // setup email data with unicode symbols
  let mailOptions = {
    from: req.body.email, // sender address
    replyTo: req.body.email,
    to: process.env.NODEMAILER_RECIEVER, // list of receivers
    subject: `Message from ${req.body.firstName}`, // Subject line
    text: req.body.content, // plain text body
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

  let subscribing = req.body.newsletter
  if (subscribing === "true") {
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.email

    let data = {
      members: [
        {
          email_address: email,
          status: 'subscribed',
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName
          }
        }
      ]
    }
    let mailchimpData = JSON.stringify(data)

    const url = `https://us16.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}`
    const options = {
      method: 'POST',
      auth: process.env.MAILCHIMP_API_KEY
    }

    const request = https.request(url, options, function (response) {
      if (response.statusCode == 200) {
        console.log('successfully subscribed')
      } else {
        console.log('there was an error, you are not subscribed')
      }

      response.on('data', function (data) {
        console.log(JSON.parse(data))
      })
    })

    request.write(mailchimpData)
    request.end()
  }
})

module.exports = router
