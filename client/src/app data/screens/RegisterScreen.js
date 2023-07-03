import React, { useState } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'
import Success from '../components/Success'


const RegisterScreen = () => {
  const [credentials, setCredentials] = useState({ email: '', name: '', password: '', cPassword: '' })
  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  const [success, setSuccess] = useState()

  const handleSubmit = (e) => {
    const { name, value } = e.target
    setCredentials({ ...credentials, [name]: value })

  }
  const Register = async () => {

    if (credentials.password === credentials.cPassword) {
      const user = {
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        cPassword: credentials.cPassword,
      };
      try {
        setLoading(true)
        let response = await axios.post('http://localhost:5000/api/users/register', user).data
        setLoading(false)
        setSuccess(true)

        setCredentials({ email: '', name: '', password: '', cPassword: '' })
      } catch (error) {
        console.log("Error is", error)
        setLoading(false)
        setError(true)

      }
    } else {
      alert('Password does not match.');
    }
  };

  return (
    <>
      {loading && (<Loader />)}
      {error && (<Error />)}
      <div className='row justify-content-center mt-5'>
        <div className='col-md-5'>
          {success && (<Success message='Registration success' />)}
          <div className="bs">
            <h2>Register </h2>
            <input type="name" name='name'
              className='form-control'
              placeholder='enter name'
              value={credentials.name}
              onChange={(e) => { handleSubmit(e) }}
            />
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
            <input type="password" name='cPassword'
              className='form-control'
              placeholder='confirm password'
              value={credentials.cPassword}
              onChange={(e) => { handleSubmit(e) }}
            />
            <button className='btn btn-primary mt-3' onClick={Register}>Register</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterScreen