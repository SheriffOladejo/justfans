import './Login.css';
import React, { useState, useEffect } from 'react';
import SignupSection from '../Signup/SignupSection';
import Utils from '../../utils/Utils';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';  
import Constants from '../../utils/Constants';
import { Base64 } from 'js-base64';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import DbHelper from '../../utils/DbHelper';

function Login() {

  const dbHelper = new DbHelper();

  const navigate = useNavigate();

  const [username, setUsername] = useState('sheriff');
  const [password, setPassword] = useState('password');

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const [isGoogleSignIn, setGoogleSignIn] = useState(false);

  const toggleSignupVisibility = () => {
    setShowSignup(!showSignup);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    //login();
  }, [isGoogleSignIn]);

  const login = async () => {
    if (username !== "") {
      if (Utils.isValidEmail(username)) {
        const emailResponse = await dbHelper.checkForEmail(username);
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
            const user_id = emailResponse.data[0]["user_id"];

            if (profile_setup !== "true") {
              navigate('/profile-setup', {state: {
                profile_setup,
                firstname,
                lastname,
                dob,
                verification_doc,
                location,
                user_id
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
        const usernameResponse = await dbHelper.checkForUsername(username);
        if (usernameResponse.data.length !== 0) {
          const _password = Base64.decode(usernameResponse.data[0]["password"]);
          if (password !== _password) {
            toast("Incorrect password");
          }
          else {
            const profile_setup = usernameResponse.data[0]["profile_setup"];
            const firstname = usernameResponse.data[0]["firstname"];
            const lastname = usernameResponse.data[0]["lastname"];
            const dob = usernameResponse.data[0]["dob"];
            const verification_doc = usernameResponse.data[0]["verification_doc"];
            const location = usernameResponse.data[0]["location"];
            const user_id = usernameResponse.data[0]["user_id"];

            if (profile_setup !== "true") {
              navigate('/profile-setup', {state: {
                username,
                profile_setup,
                firstname,
                lastname,
                dob,
                verification_doc,
                location,
                user_id
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

  const onGoogleSuccess = async (res) => {
    const mail = res.profileObj["email"];
    const firstname = res.profileObj['givenName'];
    const lastname = res.profileObj['familyName'];
    if (mail !== "") {
      setUsername(mail);
      setFirstname(firstname);
      setLastname(lastname);
      setGoogleSignIn(true);
      login();
    }
    else {
      toast("An error occurred");
    }
  }

  const onGoogleFailure = (res) => {
    console.log("Google sign up failure: ", res);
  }


  return (
    <div className='login-container'>
      <div className="login-column">
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
          <div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              style={{ width: '350px', marginTop: '20px', fontFamily: 'Inter, sans-serif' }}
            />
            <img
              src={showPassword ? '/images/eye-icon-open.png' : '/images/eye-icon-closed.png'}
              alt={showPassword ? 'Hide Password' : 'Show Password'}
              className="eye-icon"
              onClick={togglePasswordVisibility}
            />
          </div>
          <button onClick={login} type="button" style={{ width: '372px', marginTop: '30px', fontFamily: 'Inter, sans-serif', fontWeight: '700' }}>Log in</button>
        </form>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', cursor: 'pointer' }}>Forgot password?</p>
        <div className="or-container">
          <div className="line"></div>
          <div className="or-text">or</div>
          <div className="line"></div>
        </div>
        <GoogleLogin
            clientId={Constants.GOOGLE_CLIENT_ID}
            render={renderProps => (
              <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="google-button" >
                <img src='/images/google_logo.png' alt="Google Logo" className="google-logo" />
                Sign in with Google
              </button>
            )}
            buttonText="Sign up with Google"
            onSuccess={onGoogleSuccess}
            onFailure={onGoogleFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={false}
          />
          <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
