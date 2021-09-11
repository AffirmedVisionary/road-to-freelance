import React from "react";

const ThankYou = (props) => {
  console.log(props.location.state.name)

  return (
    <div className="row">
    <div className="col-sm-2" />
    <div className="col-sm-8">
      <h4 className="text-muted text-center mb-5">Thank You</h4>

      <div className="card p-5 shadow">
        <p>Thank you, {props.location.state.name}, your message has sent successfully. Thank you for getting in touch</p>
      </div>
    </div>
    <div className="col-sm-2" />
  </div>

  )
}

export default ThankYou;
