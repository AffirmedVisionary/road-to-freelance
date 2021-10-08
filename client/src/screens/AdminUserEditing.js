import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { getUserDetails, updateUser } from "../actions/userActions"
import { USER_UPDATE_RESET } from "../constants/userConstants"

const AdminUserEditing = ({ match, history }) => {
  const userId = match.params.id

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    isAdmin: false,
  });

  const { firstName, lastName, email, isAdmin } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push("/admin/userlist")
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setData({ ...data, firstName: user.firstName, lastName: user.lastName, email: user.email, isAdmin: user.isAdmin})
      }
    }
  }, [dispatch, user, userId, history, successUpdate, data])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, firstName, lastName, email, isAdmin }))
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <h1>Edit User</h1>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      <div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
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
            <div className="checkbox" controlId='isAdmin'>
            <input type="hidden" name="isAdmin" value="false" />
              <input
                style={{marginRight: "1rem"}}
                type='checkbox'
                name="isAdmin"
                value={isAdmin}
              ></input>
              <label htmlFor="isAdmin">Is Admin?</label>
            </div>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Update
            </button>
          </form>
        )}
      </div>
    </>
  )
}

export default AdminUserEditing
