import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './ProfileSetup.css';
import Navbar from './Navbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AppUser from '../../models/AppUser';
import { ToastContainer, toast } from 'react-toastify';
import DbHelper from '../../utils/DbHelper';

function ProfileSetup () {
      const [selectedDate, setSelectedDate] = useState('');
      const [dob, setDOB] = useState('');
      const [showDatePicker, setShowDatePicker] = useState(false);
      const [_username, setUsername] = useState('');
      const [_firstname, setFirstname] = useState('');
      const [_lastname, setLastname] = useState('');
      const [stage, setStage] = useState(1);

      const location = useLocation();

      const { 
        email_hash = '',
        account_type = '',
        username = '',
        profile_setup = '',
        firstname = '',
        lastname = '',
        email = '',
        encodedPassword = ''
       } = location.state || {};
      var user = new AppUser();
      user.setUserName(username);
      user.setFirstName(firstname);
      user.setLastName(lastname);
      user.setEmail(email);
      user.setPassword(encodedPassword);
      console.log("encoded password: " + encodedPassword);
      user.setUserId(email_hash);
      user.setProfileSetup(profile_setup);

      useEffect(() => {
        if (profile_setup === "2") {
          setStage(2);
        }
        else if (profile_setup === "3") {
          setStage(3);
        }
      });

      const dbHelper = new DbHelper();

      const datePickerRef = useRef(null);

      const handleDateChange = (date) => {
        const options = {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        };
        const formattedDate = new Date(date).toLocaleDateString('en-US', options);
        const arr = formattedDate.split(',');
        var s = "";
        for (let i = 0; i < arr.length; i++) {
          if (i === 1) {
            s += arr[i] + ", ";
          }
          else {
            s += arr[i] + " ";
          }
        }
        setDOB(s);
        setSelectedDate(date);
      };

      const openDatePicker = () => {
        datePickerRef.current.setOpen(true);
      };

      const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
      };

      const countries = [
        'Nigeria',
        'Ghana',
      ];

      const [selectedCountry, setSelectedCountry] = useState('');

      const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
      };

      const handleBack = () => {
        setStage(stage - 1);
      };

      const navigate = useNavigate();

      const handleContinue = async () => {
        if (stage === 1) {
          if (_firstname === "" && firstname === "") {
            toast("Firstname is required");
          }
          else if (_lastname === "" && lastname === "") {
            toast("Lastname is required");
          }
          else if (_username === "" && username === "") {
            toast("Username is required");
          }
          else if (selectedDate === "" || selectedDate === undefined) {
            toast("DOB is required");
          }
          else {
            user.setFirstName(_firstname !== "" ? _firstname : firstname);
            user.setLastName(_lastname !== "" ? _lastname : lastname);
            user.setUserName(username === '' ? _username : username);
            console.log("username: " + username);
            console.log("_username: " + _username);
            console.log("user object username: " + user.getUserName());
            user.setDOB(dob);
            console.log(dob);
            user.setProfileSetup("2");
            const response = await dbHelper.updateUser(user);
            setStage(stage + 1);
          }
        }
        else if (stage === 2) {
          setStage(stage + 1);
        }
        else if (stage === 3) {
          navigate('/main-page');
        }
      };

      return (
      <div>
        <Navbar />
        <div className="dialog-container">
          <div className="profile-dialog">
            {stage === 1 && (
              <div>
                <h2>Set up your profile</h2>
                <div className="input-row">
                    <div className="input-group">
                      <label>First Name</label>
                      <input onChange={(e) => setFirstname(e.target.value)} value={_firstname} placeholder={firstname} type="text" />
                    </div>
                    <div className="input-group">
                      <label>Last Name</label>
                      <input onChange={(e) => setLastname(e.target.value)} value={_lastname} placeholder={lastname} type="text" />
                    </div>
                </div>
                <div className="input-row">
                    <div className="input-group">
                      <label>Username</label>
                      <input onChange={(e) => setUsername(e.target.value)} disabled={account_type === "google" ? false : true } value={_username} placeholder={username} type="text" />
                    </div>
                    <div className="input-group">
                        <label>Date of Birth</label>
                        <DatePicker
                          selected={selectedDate}
                          onChange={handleDateChange}
                          showYearDropdown
                          scrollableYearDropdown
                          yearDropdownItemNumber={100}
                          dateFormat="EEE MMMM d, yyyy"
                          ref={datePickerRef}
                          className="date-picker-input"
                          onKeyDown={(e) => {
                              e.preventDefault();
                          }}
                        />
                    </div>
                </div>
              </div>
            )}

            {stage === 2 && (
              <div>
                <h2>Verify your identity</h2>
                <div>
                  <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px' }} htmlFor="countrySelect">Country of residence</label>
                  <div style={{ display: 'flex', borderRadius: '4px', border: '1px solid #ccc', padding: '4px 8px', marginTop: '10px', marginBottom: '10px' }}>
                    <select value={selectedCountry} onChange={handleCountryChange} id="countrySelect" style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#667085', margin: '5px', border: 'none', outline: 'none', width: '100%', height: '100%' }}>
                      {countries.map((country, index) => (
                        <option key={index} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px'}}>Provide a verification document</label>
                <div style={{ marginTop: '10px', marginBottom: '30px', width: '100%', borderRadius: '4px', border: '1px dashed #F94F64', backgroundColor: '#FEDCE045' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '16px' }}>
                    <img src="/images/export.png" alt="Upload Icon" style={{ cursor: 'pointer', width: '48px', height: '48px', color: '#F94F64' }} />
                    <p style={{ fontWeight: '700', fontFamily: 'Inter, sans-serif', fontSize: '18px', marginTop: '8px', marginBottom: '8px' }}>
                      Drag & drop files or <span style={{ color: '#F94F64', cursor: 'pointer' }}>browse</span>
                    </p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px' }}>Supported formats: JPEG, PNG, PDF, WORD</p>
                  </div>
                </div>
              </div>
            )}

            {stage === 3 && (
                <div>
                    <h2>Almost done!</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <div
                            style={{
                              width: '80px',
                              height: '80px',
                              borderRadius: '50%',
                              backgroundColor: '#FEF0F1',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <img src="/images/add_gallery.png" alt="Profile" style={{ cursor: 'pointer', maxWidth: '100%', maxHeight: '100%' }} />
                          </div>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', marginTop: '0px' }}>Upload a profile photo</p>
                          <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                            <label style={{ marginBottom: '10px', fontFamily: 'Inter, sans-serif', fontSize: '14px' }} htmlFor="bioInput">Add a bio</label>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                              <textarea
                                id="bioInput"
                                style={{
                                  fontFamily: 'Inter, sans-serif',
                                  width: '98.5%',
                                  height: '100px',
                                  border: '1px solid #ccc',
                                  borderRadius: '4px',
                                  marginBottom: '8px',
                                  resize: 'none',
                                }}
                              />
                            </div>
                          </div>
                        </div>
                </div>
            )}


            <div className="navigation-buttons">
              {stage > 1 && (
                <div className="back-button" onClick={handleBack}>
                  <img src="/images/profile_back.png" alt="Back" />
                  Back
                </div>
              )}
              {stage === 1 && (
                <div></div>
              )}
              <button className="continue-button" onClick={handleContinue}>
                {stage === 3 ? "Let's go" : "Continue"}
              </button>
            </div>
            <ToastContainer/>
          </div>
        </div> 
      </div>
      );
}

export default ProfileSetup;