import './Login.css';
import React, { useState } from 'react';
import SignupSection from '../Signup/SignupSection';
import Utils from '../../utils/Utils';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';  
import Constants from '../../utils/Constants';
import { Base64 } from 'js-base64';
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState('sheriff');
  const [password, setPassword] = useState('password');

  const [showPassword, setShowPassword] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const toggleSignupVisibility = () => {
    setShowSignup(!showSignup);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const checkForUsername = async () => {
    const data = {
      "username": username
    };
    try {
      const response = await axios.get(`${Constants.BASE_API_URL}/checkUsername`, {params: data});
      return response;
    }
    catch (error) {
      console.error("An error occurred: " + error);
    }
  }

  const checkForEmail = async () => {
    const data = {
      "email": username
    };
    try {
      const response = await axios.get(`${Constants.BASE_API_URL}/checkEmail`, {params: data});
      return response;
    }
    catch (error) {
      console.error("An error occurred: " + error);
    }
  }

  const login = async () => {
    if (username !== "") {
      if (Utils.isValidEmail(username)) {
        const emailResponse = await checkForEmail();
        if (emailResponse.data.length !== 0) {
          const _password = Base64.decode(emailResponse.data[0]["password"]);
          if (password !== _password) {
            toast("Incorrect password");
          }
          else {
            const profile_setup = emailResponse.data[0]["profile_setup"];
            const firstname = emailResponse.data[0]["firstname"];
            const lastname = emailResponse.data[0]["lastname"];
            const dob = emailResponse.data[0]["dob"];
            const verification_doc = emailResponse.data[0]["verification_doc"];
            const location = emailResponse.data[0]["location"];

            if (profile_setup !== "true") {
              navigate('/profile-setup', {state: {
                username,
                profile_setup,
                firstname,
                lastname,
                dob,
                verification_doc,
                location
              }});
            } 
            else if (profile_setup === "true") {
              navigate('/main-page');
            }
          }
        }
        else {
          toast("User not found");
        }
      }
      else {
        const usernameResponse = await checkForUsername();
        if (usernameResponse.data.length !== 0) {
          const _password = Base64.decode(usernameResponse.data[0]["password"]);
          if (password !== _password) {
            toast("Incorrect password");
          }
          else {
            const profile_setup = emailResponse.data[0]["profile_setup"];
            const firstname = emailResponse.data[0]["firstname"];
            const lastname = emailResponse.data[0]["lastname"];
            const dob = emailResponse.data[0]["dob"];
            const verification_doc = emailResponse.data[0]["verification_doc"];
            const location = emailResponse.data[0]["location"];

            if (profile_setup !== "true") {
              navigate('/profile-setup', {state: {
                username,
                profile_setup,
                firstname,
                lastname,
                dob,
                verification_doc,
                location
              }});
            } 
            else if (profile_setup === "true") {
              navigate('/main-page');
            }
          }
        }
        else {
          toast("User not found");
        }
      }
    }
    else {
      toast("Username or email is required");
    }
  }

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
        <input  value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Email or Username"
                style={{ width: '350px', fontFamily: 'Inter, sans-serif' }} />
        <div className="login-container">
          <div className="password-input-container">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
        <button onClick={login} type="button" style={{ width: '372px', fontFamily: 'Inter, sans-serif', fontWeight: '700' }}>Log in</button>
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
      <ToastContainer />
    </div>
  );
}

export default Login;
