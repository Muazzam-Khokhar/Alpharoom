import axios from 'axios'
import React, { useState } from 'react'
import Loader from '../components/Loader'
import Error from '../components/Error'
import { useNavigate } from 'react-router-dom'

const LoginScreen = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState()
  const [error, setError] = useState()

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    const { name, value } = e.target
    setCredentials({ ...credentials, [name]: value })
  }
  const Login = async () => {

    const user = {
      email: credentials.email,
      password: credentials.password,
    };

    try {
      setLoading(true)
      let response = await axios.post('http://localhost:5000/api/users/login/', user)
      setLoading(false)
      if (response) {
        localStorage.setItem('currentUser', JSON.stringify(response));
        window.location.href='/'
      }
    } catch (error) {
      console.log("Error is", error)
      setLoading(false)
      setError(true)
    }

  };

  return (
    <>
      {loading && (<Loader />)}
      <div className='row justify-content-center mt-5'>
        <div className='col-md-5'>
          {error && (<Error message='Invalid Credentials' />)}


          <div className="bs">
            <h2>Login</h2>
            <input type="email" name='email'
              value={credentials.email}
              placeholder='enter email'
              className='form-control'
              onChange={(e) => { handleSubmit(e) }}
            />
            <input type="password" name='password'
              className='form-control'
              placeholder='enter password'
              value={credentials.password}
              onChange={(e) => { handleSubmit(e) }}
            />
            <button className='btn btn-primary mt-3' onClick={Login}>Login</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginScreen