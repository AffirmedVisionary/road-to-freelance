import React from 'react'

const ThankYou = (props) => {
  console.log(props)
  console.log(props.location.state.newsletter)

  let newsletter = props.location.state.newsletter

  return (
    <div className='row'>
      <div className='col-sm-2' />
      <div className='col-sm-8'>
        <h4 className='text-muted text-center mb-5'>Thank You</h4>

        <div className='card p-5 shadow'>
          {newsletter === "true" ? (
            <p>
              Thank you, {props.location.state.firstName}, your message has sent
              successfully. Thank you for getting in touch and thank you for
              subscribing to the newsletter.
            </p>
          ) : (
            <p>
              Thank you, {props.location.state.firstName}, your message has sent
              successfully. Thank you for getting in touch
            </p>
          )}
        </div>
      </div>
      <div className='col-sm-2' />
    </div>
  )
}

export default ThankYou
