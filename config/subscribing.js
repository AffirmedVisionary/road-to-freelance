import request from 'request'
import https from 'https'

const subscribing = ({ firstName, lastName, email, newsletter }) => {
  if (newsletter === 'true') {
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

}

export default subscribing
