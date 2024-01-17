import './SignupSection.css';
import React, { useState, useEffect } from 'react';
import Selector from '../Signup/Selector';
import Login from '../Login/Login';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isValidEmail, stringToUint8Array, sha256 } from '../../utils/Utils';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import Constants from '../../utils/Constants';
import { Base64 } from 'js-base64';
import DbHelper from '../../utils/DbHelper';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function SignupSection () {

    const dbHelper = new DbHelper();

    const constants = require('../../utils/Constants');

    const [selectedOption, setSelectedOption] = useState('fan');

    const handleOptionChange = (option) => {
        setSelectedOption(option);
        console.log(option);
    };

    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState('sheriff');
    const [email, setEmail] = useState('sherifffoladejo@gmail.com');
    const [password, setPassword] = useState('password');
    const [encodedPassword, setEncodedPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('password');

    const [toastMessage, setToastMessage] = useState("");

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [showLogin, setShowLogin] = useState(false);

    const [isAcceptTerms, setIsAcceptTerms] = useState(false);

    const [isGoogleSignIn, setGoogleSignIn] = useState(false);

    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    const [isFirstLoad, setIsFirstLoad] = useState(false);

    const toggleShowLogin = () => {
        setShowLogin(!showLogin);
    };

    const handleCheckboxChange = () => {
      setIsAcceptTerms(!isAcceptTerms);
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
    }, []);

    useEffect(() => {
      createAccountGoogle();
    }, [isGoogleSignIn]);

    useEffect(() => {
      if (toastMessage !== "") {
        toast(toastMessage);
        setToastMessage("");
      }
    }, [toastMessage]);

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth <= 600) {
          setIsMobile(true);
          setIsDesktop(false);
          setIsTablet(false);
        } else if (window.innerWidth <= 1024) {
          setIsTablet(true);
          setIsMobile(false);
          setIsDesktop(false);
        }
        else {
          setIsDesktop(true);
          setIsMobile(false);
          setIsTablet(false);
        }
      };
  
      handleResize();
  
      window.addEventListener('resize', handleResize);
  
      setIsFirstLoad(true);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
  
    }, []);

    const createAccountGoogle = async () => {
      if (isGoogleSignIn) {
        const account_type = "google";
        const uint8Array = stringToUint8Array(email);
        const email_hash = await sha256(uint8Array);
        
        const data = {
          "firstname": firstname,
          "lastname": lastname,
          "email": email,
          "password": "",
          "creator_mode": selectedOption,
          "user_id": email_hash,
          "date_joined": Date.now(),
          "account_type": account_type,
          "username": ""
        };

        try {
  
          const response = await axios.post(`${Constants.BASE_API_URL}/signup`, data);
          if (selectedOption === "fan") {
            navigate('/main-page');
          }
          else {
            navigate('/profile-setup', {state: {
              firstname,
              lastname,
              email,
              email_hash,
              account_type
            }});
          }
        } catch (error) {
          setLoading(false);
          setToastMessage("Request failed: " + error);
          console.error('Request failed:', error);
        }
      }
      setGoogleSignIn(false);
    }

    const createAccount = async () => {
      if (email !== "") {
        if (isAcceptTerms) {
          if (username === "") {
            toast.error('Username is required');
          }
          else if (email === "") {
            toast.error("Email is required");
          }
          else if (!isValidEmail(email)) {
            toast.error("Invalid email");
          }
          else if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
          }
          else if (password !== confirmPassword) {
            toast.error("Passwords don't match");
          }
          else {
            if (!isGoogleSignIn) {
              setLoading(true);
              const account_type = "manual";
              const usernameResponse = await dbHelper.checkForUsername(username);
              const emailResponse = await dbHelper.checkForEmail(email);
              if (usernameResponse.data.length > 0) {
                setLoading(false);
                setToastMessage("This username is already taken");
                toast("This username is already taken");
              }
              else if (emailResponse.data.length > 0) {
                setLoading(false);
                setToastMessage("This email is already registered");
              }
              else {
                const uint8Array = stringToUint8Array(email);
                const email_hash = await sha256(uint8Array);
                
                const data = {
                  "username": username,
                  "email": email,
                  "password": encodedPassword,
                  "creator_mode": selectedOption,
                  "user_id": email_hash,
                  "date_joined": Date.now(),
                  "firstname": firstname,
                  "lastname": lastname,
                  "account_type": account_type
                };
      
                try {
      
                  const response = await axios.post(`${Constants.BASE_API_URL}/signup`, data);
                  if (selectedOption === "fan") {
                    navigate('/main-page');
                  }
                  else {
                    navigate('/profile-setup', {state: {
                      username,
                      email,
                      encodedPassword,
                      firstname,
                      lastname,
                      email_hash,
                      account_type
                    }});
                  }
                } catch (error) {
                  setLoading(false);
                  console.error('Request failed:', error);
                }
                
              }
            }
          }
        }
        else {
          toast("Read and accept Terms and Conditons");
        }
      }
    };

    const googleButtonClicked = (renderProps) => {
      if (!isAcceptTerms) {
        toast.error("Read and accept Terms of Service");
      }
      else {
        setLoading(true);
        renderProps.onClick();
      }
    }

    const onGoogleSuccess = async (res) => {
      const mail = res.profileObj["email"];
      const firstname = res.profileObj['givenName'];
      const lastname = res.profileObj['familyName'];
      setFirstname(firstname);
      setLastname(lastname);
      if (mail !== "") {
        const emailResponse = await dbHelper.checkForEmail(mail);
        if (emailResponse.data.length > 0) {
          setLoading(false);
          setFirstname("");
          setLastname("");
          setToastMessage("This email is already registered");
        }
        else {
          setEmail(mail);
          setGoogleSignIn(true);
        }
      }
      else {
        setLoading(false);
        setToastMessage("An error occurred");
      }
    }

    const onGoogleFailure = (res) => {
      setLoading(false);
      setToastMessage("Google sign up failure");
      console.log("Google sign up failure: ", res);
    }


    if (showLogin) {
        return (
            <Login/>
        );
    }

    if (loading) {
      return (<div><LoadingSpinner/></div>)
    }

    return (
      <div className='signup-container'>
        {!loading && <div className="signup-column">
        { isMobile && <img className='signup-logo' src="/images/justfans_black_red.png" style={{ width:'120px', alignSelf:'flex-start' }}/> }
          <h2 className='signup-create-account-text' style={{textAlign: 'left'}}>
            <span style={{ fontWeight: '700', fontFamily: 'Inter, sans-serif', fontSize: '33px', color: 'black' }}>Create</span>{' '}
            <span style={{ fontWeight: '700', fontFamily: 'Inter, sans-serif', fontSize: '33px', color: '#F94F64'}}>Your Account</span>
          </h2>

          <p className='signup-already-have-account' style={{ }}>
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
                className='signup-username'
                style={{ fontFamily: 'Inter, sans-serif', marginTop: '0px' }}
            />
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email address"
                className='signup-email'
                style={{ fontFamily: 'Inter, sans-serif', marginTop: '20px' }}
            />
            <div>
              <div className="password-input-container">
                <input
                    className='signup-password'
                    value={password}
                    onChange={(e) => {setPassword(e.target.value);setEncodedPassword(Base64.encode(e.target.value));}}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    style={{ fontFamily: 'Inter, sans-serif', marginTop: '20px' }}
                />
                <img
                  src={showPassword ? '/images/eye-icon-open.png' : '/images/eye-icon-closed.png'}
                  alt={showPassword ? 'Hide Password' : 'Show Password'}
                  className="signup-eye-icon"
                  onClick={togglePasswordVisibility}
                />
              </div>
              <div className="password-input-container">
                <input
                    className='signup-confirm-password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    style={{ fontFamily: 'Inter, sans-serif', marginTop: '20px' }}
                />
                <img
                  src={showConfirmPassword ? '/images/eye-icon-open.png' : '/images/eye-icon-closed.png'}
                  alt={showConfirmPassword ? 'Hide Password' : 'Show Password'}
                  className="signup-eye-icon"
                  onClick={toggleConfirmPasswordVisibility}
                />
              </div>
            </div>
            <div className="checkbox-container">
              <label className="checkbox-label">
                <input
                    type="checkbox"
                    checked={isAcceptTerms}
                    onChange={handleCheckboxChange}
                />
                <span className="checkbox-custom"></span>
                By clicking on Create Free Account, I acknowledge that I am 18+ years old and I accept the&nbsp;
                <span className="terms-link" style={{ cursor: 'pointer', marginTop: '20px' }}>Terms & Conditions</span>
              </label>
            </div>
            <button onClick={createAccount} className='signup-button' type="button">Create account</button>
          </form>
          <div className="signup-or-container">
            <div className="signup-line"></div>
            <div className="signup-or-text">or</div>
            <div className="signup-line"></div>
          </div>
          <GoogleLogin
            clientId={Constants.GOOGLE_CLIENT_ID}
            render={renderProps => (
              <button onClick={() => {googleButtonClicked(renderProps)}} disabled={renderProps.disabled} className="google-button" >
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
        </div>}
      </div>

    );
}

export default SignupSection;