import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import Loader from "../components/Loader"
import { login } from "../actions/userActions"

const Login = ({location, history}) => {
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = data

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split("=")[1] : "/"

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
    // DISPATCH LOGIN
  }

  return (
    <div className='row'>
      <div className='col-sm-2' />
      <div className='col-sm-8'>
        <h4 className='text-muted text-center mb-5'>Log into your account</h4>
        <div className='card p-5 shadow'>
          <form>
          {loading && <Loader />}
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input
                className='form-control'
                type='email'
                name='email'
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                className='form-control'
                type='password'
                name='password'
                value={password}
                onChange={handleChange}
              />
            </div>
            {error ? <p className='text-danger'>{error}</p> : null}
            <div className='text-center'>
              <button className='btn btn-primary' onClick={handleSubmit}>
                Login
              </button>
            </div>
            <p>
              Not A User? <Link to='/register'>Register</Link>
            </p>
          </form>
        </div>
      </div>
      <div className='col-sm-2' />
    </div>
  )
}

export default Login
