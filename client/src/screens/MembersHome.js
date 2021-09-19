import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getUserDetails, updateUserProfile } from "../actions/userActions"
import { USER_UPDATE_PROFILE_RESET} from '../constants/userConstants'
import Loader from "../components/Loader"
import Message from "../components/Message";

const MembersHome = ({ location, history }) => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    message: null,
  });

  const { firstName, lastName, email, password, confirmPassword, message } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  // to check if user is logged in
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // give a success message
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  // if not logged in, go back to log in page
  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    } else {
      if (!user || !user.firstName || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails("profile"))
      } else {
        setData({ ...data, firstName: user.firstName, lastName: user.lastName, email: user.email })
      }
    }
  }, [dispatch, history, userInfo, user, success])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setData.message("Passwords do not match")
    } else {
      dispatch(updateUserProfile({ id: user._id, firstName, lastName, email, password }))
      // DISPATCH UPDATE USER
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <div className="m-5">
      <div className="jumbotron">
        <p className="lead">Welcome {user && user.firstName}</p>
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading && <Loader />}
        <form>
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
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                className="form-control"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
              />
            </div>
            <button className="btn btn-primary" onClick={submitHandler}>
                Update
              </button>
            {error ? <p className="text-danger">{error}</p> : null}
            <div className="text-center">
            </div>
          </form>
      </div>
    </div>
  );
};

export default MembersHome;
