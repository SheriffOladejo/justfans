import './Login.css';
import React, { useState } from 'react';
import SignupSection from '../Signup/SignupSection';

function Login() {

  const [showPassword, setShowPassword] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const toggleSignupVisibility = () => {
    setShowSignup(!showSignup);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (showSignup) {
    return (
        <SignupSection/>
    );
  }


  return (
    <div className="login-container">
      <h2 style={{ textAlign:'left' }}>
        <span style={{ fontWeight: '700', color: 'black', fontFamily: 'Inter, sans-serif', fontSize: '33px' }}>Log</span>{' '}
        <span style={{ color: '#F94F64', fontFamily: 'Inter, sans-serif', fontSize: '33px', fontWeight: '700' }}>In</span>
      </h2>
      <p>
        <span style={{ fontWeight: '500', color: 'black', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>Don't have an account?</span>{' '}
        <span onClick={toggleSignupVisibility}  style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: '500', color: '#F94F64', cursor: 'pointer' }}>Sign up</span>
      </p>
      <form>
        <input type="text" placeholder="Email or Phone Number" style={{ width: '350px', fontFamily: 'Inter, sans-serif' }} />
        <div className="login-container">
          <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              style={{ width: '350px', fontFamily: 'Inter, sans-serif' }}
            />
            <img
              src={showPassword ? '/images/eye-icon-open.png' : '/images/eye-icon-closed.png'}
              alt={showPassword ? 'Hide Password' : 'Show Password'}
              className="eye-icon"
              onClick={togglePasswordVisibility}
            />
          </div>
        </div>
        <button type="button" style={{ width: '372px', fontFamily: 'Inter, sans-serif', fontWeight: '700' }}>Log in</button>
      </form>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', cursor: 'pointer' }}>Forgot password?</p>
      <div className="or-container">
        <div className="line"></div>
        <div className="or-text">or</div>
        <div className="line"></div>
      </div>
      <button className="google-button" >
        <img src='/images/google_logo.png' alt="Google Logo" className="google-logo" />
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;
