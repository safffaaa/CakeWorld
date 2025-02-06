import React, { useState } from 'react';
import axios from 'axios';

function Logform({ setIsOpen }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [err, setErr] = useState('');

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let endpoint = isSignUp ? 'signUp' : 'login';
    await axios
      .post(`http://localhost:3001/${endpoint}`, { email, password })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setIsOpen();
      })
      .catch((err) => setErr(err.response?.data.message || 'An error occurred'));
  };

  return (
    <>
      <form className='form' onSubmit={handleOnSubmit}>
        <div className='form-control'>
          <label>Email</label>
          <input
            type='email'
            className='input'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='form-control'>
          <label>Password</label>
          <input
            type='password'
            className='input'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit'>{isSignUp ? 'Sign Up' : 'Login'}</button>
        {err !== '' && <h6 className='err'>{err}</h6>}
        <br />
        <p onClick={() => setIsSignUp((prev) => !prev)}>
          {isSignUp ? 'Already have an account?' : 'Create new account'}
        </p>
      </form>
    </>
  );
}

export default Logform;
