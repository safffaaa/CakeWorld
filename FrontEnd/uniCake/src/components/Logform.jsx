import React, { useState } from 'react';
import axios from 'axios';

function Logform({ setIsOpen }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [err, setErr] = useState('');

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let endpoint = isSignUp ? "signUp" : "login";

    const payload = isSignUp
      ? { username, email, password } 
      : { email, password }; 

    try {
      const res = await axios.post(`http://localhost:8000/${endpoint}`, payload);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setIsOpen();
      window.location.reload(); 
    } catch (error) {
      setErr(error.response?.data.message || "An error occurred");
    }
  };

  return (
    <>
      <form className="form" onSubmit={handleOnSubmit}>
        {isSignUp && (
          <div className="form-control">
            <label>Username</label>
            <input
              type="text"
              className="input"
              onChange={(e) => setUsername(e.target.value)}
              required={isSignUp} // Only required in sign-up mode
            />
          </div>
        )}
        <div className="form-control">
          <label>Email</label>
          <input
            type="email"
            className="input"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            className="input"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
        {err && <h6 className="err">{err}</h6>}
          <p onClick={() => setIsSignUp((prev) => !prev)}>
            {isSignUp ? "Already have an account? Login" : "Create new account"}
          </p>
      </form>
    </>
  );
}

export default Logform;