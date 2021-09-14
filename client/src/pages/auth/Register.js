import React, { useState } from "react";
import axios from "axios";

const Register = (props) => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    newsletter: false,
    error: null,
  });

  const { firstName, lastName, email, password, newsletter, error } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setData({ ...data, error: null });
      await axios.post(
        "/api/auth/register",
        { firstName, lastName, email, password, newsletter },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      props.history.push("/login");
    } catch (err) {
      setData({ ...data, error: err.response.data.error });
    }
  };

  return (
    <div className="row">
      <div className="col-sm-2" />
      <div className="col-sm-8">
        <h4 className="text-muted text-center mb-5">Create an account</h4>

        <div className="card p-5 shadow">
          <form>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                className="form-control"
                type="name"
                name="firstName"
                value={firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                className="form-control"
                type="name"
                name="lastName"
                value={lastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                value={password}
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
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="col-sm-2" />
    </div>
  );
};

export default Register;
