import './SignupSection.css';
import React, { useState, useEffect } from 'react';
import Selector from '../Signup/Selector';
import Login from '../Login/Login';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isValidEmail } from '../../utils/Utils';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import Utils from '../../utils/Utils';
import Constants from '../../utils/Constants';
import { Base64 } from 'js-base64';

function SignupSection () {

    const constants = require('../../utils/Constants');

    const [selectedOption, setSelectedOption] = useState('fan');

    const handleOptionChange = (option) => {
        setSelectedOption(option);
        console.log(option);
    };

    const [username, setUsername] = useState('sheriff');
    const [email, setEmail] = useState('sherifffoladejo@gmail.com');
    const [password, setPassword] = useState('password');
    const [confirmPassword, setConfirmPassword] = useState('password');

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [showLogin, setShowLogin] = useState(false);

    const [isChecked, setIsChecked] = useState(false);

    const [isGoogleSignIn, setGoogleSignIn] = useState(false);

    const toggleShowLogin = () => {
        setShowLogin(!showLogin);
    };

    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
      setShowConfirmPassword(!showConfirmPassword);
    };

    const navigate = useNavigate();

    useEffect(() => {
      function start() {
        gapi.client.init({
          clientId: constants.GOOGLE_CLIENT_ID,
          scope: ""
        });
  
        gapi.load('client:auth2', start);
      }
    });

    useEffect(() => {
      createAccount();
    }, [isGoogleSignIn]);

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
        "email": email
      };
      try {
        const response = await axios.get(`${Constants.BASE_API_URL}/checkEmail`, {params: data});
        return response;
      }
      catch (error) {
        console.error("An error occurred: " + error);
      }
    }

    const createAccount = async () => {
      if (email !== "") {
        if (isChecked) {
          if (!isGoogleSignIn && username === "") {
            toast.error('Username is required');
          }
          else if (!isGoogleSignIn && email === "") {
            toast.error("Email is required");
          }
          else if (!isGoogleSignIn && !isValidEmail(email)) {
            toast.error("Invalid email");
          }
          else if (!isGoogleSignIn && password.length < 6) {
            toast.error("Password must be at least 6 characters");
          }
          else if (!isGoogleSignIn && password !== confirmPassword) {
            toast.error("Passwords don't match");
          }
          else {
            if (!isGoogleSignIn) {
              const usernameResponse = await checkForUsername();
              const emailResponse = await checkForEmail();
              if (usernameResponse.data.length > 0) {
                toast("This username is already taken");
              }
              else if (emailResponse.data.length > 0) {
                toast("This email is already registered");
              }
              else {
                const uint8Array = Utils.stringToUint8Array(email);
                const email_hash = await Utils.sha256(uint8Array);
                const data = {
                  "username": username,
                  "email": email,
                  "password": Base64.encode(password),
                  "creator_mode": selectedOption,
                  "user_id": email_hash,
                  "date_joined": Date.now(),
                  "firstname": firstname,
                  "lastname": lastname
                };
      
                try {
      
                  const response = await axios.post(`${constants.BASE_API_URL}/signup`, data);
                  
                } catch (error) {
                  console.error('Request failed:', error);
                }
                navigate('/profile-setup', {state: {
                  username,
                  firstname,
                  lastname,
                  
                }});
              }
            }
            else{
              const uint8Array = Utils.stringToUint8Array(email);
              const email_hash = await Utils.sha256(uint8Array);
              const data = {
                "firstname": firstname,
                "lastname": lastname,
                "email": email,
                "password": Base64.encode(password),
                "creator_mode": selectedOption,
                "user_id": email_hash,
                "date_joined": Date.now(),
              };
    
              try {
    
                const response = await axios.post(`${constants.BASE_API_URL}/signup`, data);
                navigate('/profile-setup', {state: {
                  username,
                  firstname,
                  lastname,

                }});
              } catch (error) {
                console.error('Request failed:', error);
              }
            }
          }
        }
        else {
          toast("Read and accept terms and conditons");
        }
      }
    };

    const onGoogleSuccess = async (res) => {
      const mail = res.profileObj["email"];
      const firstname = res.profileObj['givenName'];
      const lastname = res.profileObj['familyName'];
      setFirstname(firstname);
      setLastname(lastname);
      console.log("Google response: ", res.profileObj);
      if (mail !== "") {
        const emailResponse = await checkForEmail();
        if (emailResponse.data.length > 0) {
          toast("This email is already registered");
        }
        else {
          setEmail(mail);
          setGoogleSignIn(true);
        }
      }
      else {
        toast("An error occurred");
      }
    }

    const onGoogleFailure = (res) => {
      console.log("Google sign up failure: ", res);
    }


    if (showLogin) {
        return (
            <Login/>
        );
    }

    return (
        <div className="signup-container">
          <h2 style={{ textAlign: 'left'}}>
            <span style={{ fontWeight: '700', fontFamily: 'Inter, sans-serif', fontSize: '33px', color: 'black' }}>Create</span>{' '}
            <span style={{ fontWeight: '700', fontFamily: 'Inter, sans-serif', fontSize: '33px', color: '#F94F64', cursor: 'pointer' }}>Your Account</span>
          </h2>

          <p style={{ }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: '500', fontSize: '14px', color: 'black' }}>Already have an account?</span>{' '}
            <span onClick={toggleShowLogin} style={{ fontFamily: 'Inter, sans-serif', fontWeight: '500', fontSize: '14px', color: '#F94F64', cursor: 'pointer' }}>Log in</span>
          </p>

          <Selector selectedOption={selectedOption} handleOptionChange={handleOptionChange}/>

          <form>
            <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Username"
                style={{ width: '350px', fontFamily: 'Inter, sans-serif' }}
            />
            <div style={{ height: '20px' }}></div>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email address"
                style={{ width: '350px', fontFamily: 'Inter, sans-serif' }}
            />
            <div className="signup-container">
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
              <div style={{ height: '20px' }}></div>
              <div className="password-input-container">
                <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    style={{ width: '350px', fontFamily: 'Inter, sans-serif' }}
                />
                <img
                  src={showConfirmPassword ? '/images/eye-icon-open.png' : '/images/eye-icon-closed.png'}
                  alt={showConfirmPassword ? 'Hide Password' : 'Show Password'}
                  className="eye-icon"
                  onClick={toggleConfirmPasswordVisibility}
                />
              </div>
            </div>
            <div className="checkbox-container">
              <label className="checkbox-label">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <span className="checkbox-custom"></span>
                By clicking on Create Free Account, I acknowledge that I am 18+ years old and I accept the&nbsp;
                <span className="terms-link" style={{ cursor: 'pointer' }}>Terms & Conditions</span>
              </label>
            </div>
            <div style={{ height: '20px' }}></div>
            <button onClick={createAccount} type="button" style={{ width: '372px', fontFamily: 'Inter, sans-serif', fontWeight: '700' }}>Create account</button>
          </form>
          <div className="or-container">
            <div className="line"></div>
            <div className="or-text">or</div>
            <div className="line"></div>
          </div>
          <GoogleLogin
            clientId={constants.GOOGLE_CLIENT_ID}
            render={renderProps => (
              <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="google-button" >
                <img src='/images/google_logo.png' alt="Google Logo" className="google-logo" />
                Sign up with Google
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
    );
}

export default SignupSection;