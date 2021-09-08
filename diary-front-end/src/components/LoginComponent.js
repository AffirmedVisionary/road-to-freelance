import { login, authenticate, isAuth } from "../actions/authActions";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

const LoginComponent = ({ history }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { email, password, error, loading, message, showForm } = values;

  useEffect(() => {
    isAuth() && history.push("/");
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.table({ name, email, password, error, loading, message, showForm });

    setValues({ ...values, loading: true, error: false });
    const user = { email, password };

    login(user).then((data) => {
      try {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          //save user token to cookie
          //save user info to localStroage
          //authenticate user
          authenticate(data, () => {
            if (isAuth() && isAuth().role === 1) {
              history.push("/admin");
            } else {
              history.push("/user");
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const showLaoding = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";
  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";
  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  const loginForm = () => {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              value={email}
              onChange={handleChange("email")}
              type="email"
              className="form-control"
              placeholder="Type your email"
            />
            <br />

            <input
              value={password}
              onChange={handleChange("password")}
              type="password"
              className="form-control"
              placeholder="Type your password"
            />
          </div>
          <button className="btn btn-primary">login</button>
        </form>
      </>
    );
  };

  return (
    <div className="container">
      {showLaoding()}
      {showError()}
      {showMessage()}
      {showForm && loginForm()}
    </div>
  );
};

export default withRouter(LoginComponent);
