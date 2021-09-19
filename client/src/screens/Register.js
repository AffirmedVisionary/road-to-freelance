import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../components/Loader";
import Message from "../components/Message"
import { register } from "../actions/userActions";

const Register = ({ location, history }) => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    newsletter: false,
  });

  const [message, setMessage ] = useState(null)

  const { firstName, lastName, email, password, confirmPassword, newsletter } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split("=")[1] : "/members"

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage("Passwords do not match")
    } else {
      dispatch(register(firstName, lastName, email, password, newsletter))
      // DISPATCH REGISTER
    }
  }

  return (
    <div className="row">
    <div className="col-sm-2" />
    <div className="col-sm-8">
      <h4 className="text-muted text-center mb-5">Create an account</h4>

      <div className="card p-5 shadow">
        <form>
        {message && <Message variant='danger'>{message}</Message>}
        {loading && <Loader />}
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
          <div className="form-group">
            <label htmlFor="password">Confirm Password</label>
            <input
              className="form-control"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
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
