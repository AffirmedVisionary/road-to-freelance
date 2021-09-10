import React, { useEffect, useState } from "react";
import { isAuth, register } from "../actions/authActions";
import { withRouter } from "react-router-dom";

const RegisterComponent = ({ history }) => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { firstName, lastName, email, password, error, loading, message, showForm } = values;
  useEffect(() => {
    isAuth() && history.push("/");
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.table({ firstName, lastName, email, password, error, loading, message, showForm });

    setValues({ ...values, loading: true, error: false });
    const user = { firstName, lastName, email, password };

    try {
      register(user).then((data) => {
        console.log("data" + data)
        try {
          if (data.err) {
            setValues({ ...values, error: data.err, loading: false });
            console.log("server error");
          } else {
            setValues({
              ...values,
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              error: false,
              loading: false,
              message: data.message,
              showForm: false,
            });
            // history.push("/thank-you");
          }
        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {
      console.log("something went wrong");
    }
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "Completed";
  // const showError = () =>
  //   error ? <div className="alert alert-danger">{error}</div> : "";
  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  const registerForm = () => {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              value={firstName}
              onChange={handleChange("firstName")}
              type="text"
              className="form-control"
              placeholder="Type your firstName"
            />
            <br />
            <input
              value={lastName}
              onChange={handleChange("lastName")}
              type="text"
              className="form-control"
              placeholder="Type your last name"
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
              value={password}
              onChange={handleChange("password")}
              type="password"
              className="form-control"
              placeholder="Type your password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </>
    );
  };

  return (
    <div className="container">
      {showLoading()}
      {/* {showError()} */}
      {showMessage()}
      {showForm && registerForm()}
    </div>
  );
};

export default withRouter(RegisterComponent);
