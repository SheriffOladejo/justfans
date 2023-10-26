import './SignupSection.css';
import React, { useState } from 'react';
import Selector from '../Signup/Selector';
import Login from '../Login/Login';
import { useNavigate } from 'react-router-dom';

function SignupSection () {

    const [selectedOption, setSelectedOption] = useState('fan');

    const handleOptionChange = (option) => {
        setSelectedOption(option);
        console.log(option);
    };

    const [username, setUsername] = useState('');
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [showLogin, setShowLogin] = useState(false);

    const [isChecked, setIsChecked] = useState(false);

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

    const createAccount = () => {
        if (isChecked) {
            navigate('/profile-setup', {state: {
                username,
                emailOrPhone,
                password,
                confirmPassword
            }});
        }
    };

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
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                type="text"
                placeholder="Email address or Phone Number"
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
          <button className="google-button" >
            <img src='/images/google_logo.png' alt="Google Logo" className="google-logo" />
            Sign up with Google
          </button>
        </div>
    );
}

export default SignupSection;