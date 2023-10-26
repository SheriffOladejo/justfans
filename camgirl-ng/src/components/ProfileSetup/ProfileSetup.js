import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './ProfileSetup.css';
import Navbar from './Navbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ProfileSetup () {

      const [selectedDate, setSelectedDate] = useState(null);
      const [showDatePicker, setShowDatePicker] = useState(false);

      const location = useLocation();

      const { username, email, password, confirmPassword } = location.state || {};

      const [stage, setStage] = useState(1);

      const datePickerRef = useRef(null);

      const handleDateChange = (date) => {
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

      const handleContinue = () => {
        if (stage !== 3) {
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
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{ width: `${(stage) * 33.33}%`, backgroundColor: stage <= 3 ? '#F94F64' : '#ccc' }}
                  ></div>
                </div>
                {stage === 1 && (
                  <div>
                    <h2>Set up your profile</h2>
                    <div className="input-row">
                        <div className="input-group">
                          <label>First Name</label>
                          <input type="text" />
                        </div>
                        <div className="input-group">
                          <label>Last Name</label>
                          <input type="text" />
                        </div>
                    </div>
                    <div className="input-row">
                        <div className="input-group">
                          <label>Username</label>
                          <input value={username} className="username" type="text" readOnly />
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
              </div>
            </div>
      </div>
      );
}

export default ProfileSetup;