import { contactUs } from "../actions/contactActions";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";

const ContactComponent = ({ history }) => {
  const [values, setValues] = useState({
    name: "",
    comapny: "",
    email: "",
    phoneNumber: "",
    content: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { name, company, email, phoneNumber, content, error, loading, message, showForm } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.table({ name, company, email, phoneNumber, content, error, loading, message, showForm });

    setValues({ ...values, loading: true, error: false });
    const emailMessage = { name, company, email, phoneNumber, content };

    contactUs(emailMessage).then((data) => {
      try {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          history.push("/send");
        }
      } catch (err) {
        console.log(err);
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";
  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";
  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  const contactForm = () => {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              value={name}
              onChange={handleChange("name")}
              type="text"
              className="form-control"
              placeholder="Type your name"
            />
            <br />
            <input
              value={company}
              onChange={handleChange("company")}
              type="text"
              className="form-control"
              placeholder="Type your company"
            />
            <br />
            <input
              value={email}
              onChange={handleChange("email")}
              type="email"
              className="form-control"
              placeholder="Type your email"
            />
            <br />
            <input
              value={phoneNumber}
              onChange={handleChange("phoneNumber")}
              type="text"
              className="form-control"
              placeholder="Type your phoneNumber"
            />
            <br />
            <input
              value={content}
              onChange={handleChange("content")}
              type="text"
              className="form-control"
              placeholder="Type your content"
            />
          </div>
          <button className="btn btn-primary">login</button>
        </form>
      </>
    );
  };

  return (
    <div className="container">
      {showLoading()}
      {showError()}
      {showMessage()}
      {showForm && contactForm()}
    </div>
  );
};

export default withRouter(ContactComponent);
