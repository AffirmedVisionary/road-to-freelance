import React from "react";
import ContactComponent from "../components/ContactComponent";

const Contact = () => {
  return (
    <>
      <h2 className="text-center pt-4 pb-4">Contact Us</h2>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <ContactComponent />
        </div>
      </div>
    </>
  )
}

export default Contact;
