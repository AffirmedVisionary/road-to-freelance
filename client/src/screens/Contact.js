import React, { useState } from "react";
import axios from "axios";

const Contact = (history) => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    content: "",
    newsletter: false,
    error: null,
  });

  const { firstName, lastName, email, content, newsletter, error } = data;

  console.log(newsletter)

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      setData({ ...data, error: null });
      await axios.post(
        "/api/send",
        { firstName, lastName, email, content, newsletter },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      history.push("/thank-you", {firstName, newsletter});
    } catch (err) {
      setData({ ...data, error: err });
    }
  };

  return (
    <div className="row">
      <div className="col-sm-2" />
      <div className="col-sm-8">
        <h4 className="text-muted text-center mb-5">Send Us a Message</h4>

        <div className="card p-5 shadow">
          <form>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                className="form-control"
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                className="form-control"
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                type="text"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">Message</label>
              <textarea
                rows="4"
                className="form-control"
                type="text"
                name="content"
                value={content}
                onChange={handleChange}
              />
            </div>
            <div className="checkbox">
            <input type="hidden" name="newsletter" value="false" />
              <input
                style={{marginRight: "1rem"}}
                type="checkbox"
                name="newsletter"
                value="true"
                onChange={handleChange}
              />
              <label htmlFor="newsletter">Join the Newsletter?</label>
            </div>
            {error ? <p className="text-danger">{error}</p> : null}
            <div className="text-center">
              <button className="btn btn-primary" onClick={handleSubmit}>
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="col-sm-2" />
    </div>
  );
}
export default Contact;
