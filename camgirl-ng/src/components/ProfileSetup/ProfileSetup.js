import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ProfileSetup.css';
import Navbar from './Navbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import DbHelper from '../../utils/DbHelper';
import Constants from '../../utils/Constants';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import Cookies from 'js-cookie';


function ProfileSetup () {

      const dbHelper = new DbHelper();

      const [selectedFile, setSelectedFile] = useState(null);
      const [selectedPP, setSelectedPP] = useState(null);
      const [selectedDate, setSelectedDate] = useState('');
      const [dob, setDOB] = useState('');
      const [bio, setBio] = useState('');
      const [showDatePicker, setShowDatePicker] = useState(false);
      const [_username, setUsername] = useState('');
      const [_firstname, setFirstname] = useState('');
      const [_lastname, setLastname] = useState('');
      const [stage, setStage] = useState(1);
      const [isDragOver, setIsDragOver] = useState(false);
      const [loading, setLoading] = useState(false);

      const [imageUrl, setImageUrl] = useState('');

      const [user, setUser] = useState(null);

      const location = useLocation();

      const [toastMessage, setToastMessage] = useState("");

      const [isMobile, setIsMobile] = useState(false);
      const [isTablet, setIsTablet] = useState(false);
      const [isDesktop, setIsDesktop] = useState(false);

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

      useEffect(() => {
        console.log("username is " + username);
        setLoading(true);
        const fetchUser = async () => {
          const _u = await dbHelper.getAppUserByUsername(username);
          setUser(_u);
        };
        fetchUser();
        if (profile_setup === "2") {
          setStage(2);
        }
        else if (profile_setup === "3") {
          setStage(3);
        }
        
        setLoading(false);
      }, []);

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
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    
      }, []);

      useEffect(() => {
        if (user !== null) {

        }
        else {
          //console.log("user is null: " + user);
        }
        
      }, [user]);

      useEffect(() => {
        if (toastMessage !== "") {
          toast(toastMessage);
          setToastMessage("");
        }
      }, [toastMessage]);

      const datePickerRef = useRef(null);

      const handleDrop = (e) => {
        e.preventDefault();
        const droppedFiles = e.dataTransfer.files;
        setIsDragOver(false);
        if (droppedFiles.length > 0) {
          
        }
      };
    
      const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
      };

      const fileInputRef = useRef();
      const ppInputRef = useRef();

      const openFileChooser = () => {
        fileInputRef.current.click();
      };

      const openProfilePicChosser = () => {
        ppInputRef.current.click();
      }
    
      const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
          setSelectedFile(selectedFile);
        }
      };

      const handlePPChange = (e) => {
        const selectedPP = e.target.files[0];
        if (selectedPP) {
          setSelectedPP(selectedPP);
          setImageUrl(URL.createObjectURL(selectedPP));
        }
      };

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

      const [selectedCountry, setSelectedCountry] = useState('Nigeria');

      const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
      };

      const handleBack = () => {
        setStage(stage - 1);
      };

      const navigate = useNavigate();

      const uploadFile = async () => {
        if (selectedFile === null && stage === 2) {
          toast("Select a file");
        }
        else if (selectedPP === null && stage === 3) {
          toast("Select a profile picture");
        }
        else {
          setLoading(true);
          const firebaseApp = initializeApp(Constants.FIREBASE_CONFIG);
          const storage = getStorage(firebaseApp);
          var storageRef;
          var uploadTask;
          if (bio === '') {
            storageRef = ref(storage, `verificationFiles/${selectedFile.name}`);
            uploadTask = uploadBytesResumable(storageRef, selectedFile);
          }
          else {
            storageRef = ref(storage, `profilePictures/${selectedPP.name}`);
            uploadTask = uploadBytesResumable(storageRef, selectedPP);
          }
          uploadTask.on('state_changed', 
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload is ${progress}% complete`);
            },
            (error) => {
              setLoading(false);
              setToastMessage("Upload error");
              console.error('Upload error:', error);
            },
            () => {
              console.log('Upload successful!');
              setLoading(false);
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                if (bio === '') {
                  user.setVerificationDoc(downloadURL);
                  user.setCountry(selectedCountry);
                  user.setProfileSetup("3");
                  dbHelper.updateUser(user);
                  setStage(3);
                }
                else {
                  user.setBio(bio);
                  user.setProfilePicture(downloadURL);
                  user.setProfileSetup("true");
                  dbHelper.updateUser(user);
                  Cookies.set('username', username, { expires: 1 });
                  Cookies.set('email', email, { expires: 1 });
                  navigate('/main-page');
                }
              });
            }
          );
        }
      }

      const handleContinue = async () => {
        if (stage === 1) {
          if (selectedDate === "" || selectedDate === undefined || selectedDate === null) {
            toast("DOB is required");
            return;
          }
          const currentDate = new Date();
          const age = currentDate.getFullYear() - selectedDate.getFullYear();
          if (_firstname === "" && firstname === "") {
            toast("Firstname is required");
          }
          else if (_lastname === "" && lastname === "") {
            toast("Lastname is required");
          }
          else if (_username === "" && username === "") {
            toast("Username is required");
          }
          else if (selectedDate === "" || selectedDate === undefined || selectedDate === null) {
            toast("DOB is required");
          }
          else if (age < 18) {
            toast("Minimum creator age is 18");
          }
          else {
            user.setFirstName(_firstname !== "" ? _firstname : firstname);
            user.setLastName(_lastname !== "" ? _lastname : lastname);
            user.setUserName(username === '' ? _username : username);
            user.setDOB(dob);
            user.setProfileSetup("2");
            const response = await dbHelper.updateUser(user);
            setStage(stage + 1);
          }
        }
        else if (stage === 2) {
          await uploadFile();
        }
        else if (stage === 3) {
          if (bio === '') {
            toast("Bio is required");
          }
          else if (selectedPP === null) {
            toast("Choose a profile picture");
          } 
          else {
            uploadFile();
          }
        }
      };

      if (loading) {
        return (
          <div>
        <Navbar />
        <div className="dialog-container">
          <div className="profile-dialog">
            <div style={{ paddingTop:'100px', paddingBottom:'100px' }}><LoadingScreen/></div>
        
          </div>
        </div> 
      </div>
        );
      }

      if (isMobile) {
        return (
          <div className='profile-setup-container'>
            <img src="/images/justfans_black_red.png" style={{ width:'120px', alignSelf:'flex-start' }}/>
            <div style={{marginTop:'20px'}}>
              <div className='progress_bar'>

              </div>
              <div style={{ width:`${stage * 33}%` }} className='progress'></div>
              {stage === 1 && (
                <div className='stage-container'>
                  <h2 style={{ alignSelf:'center'}}>Set up your profile</h2>
                  <div className="input-group">
                    <label>First Name</label>
                    <input onChange={(e) => setFirstname(e.target.value)} value={_firstname} placeholder={firstname === "" ? "Firstname" : firstname} type="text" />
                  </div>
                  <div className="input-group">
                    <label>Last Name</label>
                    <input onChange={(e) => setLastname(e.target.value)} value={_lastname} placeholder={lastname === "" ? "Lastname" : lastname} type="text" />
                  </div>
                  <div>
                      <div className="input-group">
                        <label>Username</label>
                        <input onChange={(e) => setUsername(e.target.value)} disabled={account_type === "google" ? false : true } value={_username} placeholder={username === "" ? "Username" : username} type="text" />
                      </div>
                      <div className="date-group">
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
                  <div style={{ height:'20px' }}/>
                  <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px'}}>Provide a verification document</label>
                  <div onDrop={handleDrop} onDragOver={handleDragOver} onClick={openFileChooser} style={{ cursor: 'pointer', marginTop: '10px', marginBottom: '30px', width: '100%', borderRadius: '4px', border: '1px dashed #F94F64', backgroundColor: isDragOver ? '#FEDCE0' : '#FEDCE045' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '16px' }}>
                      <img src="/images/export.png" alt="Upload Icon" style={{  width: '48px', height: '48px', color: '#F94F64' }} />
                      <p style={{ alignSelf:'center', fontWeight: '700', fontFamily: 'Inter, sans-serif', fontSize: '18px', marginTop: '8px', marginBottom: '8px' }}>
                        Drag & drop files or <span style={{ color: '#F94F64' }}>browse</span>
                      </p>
                      <p style={{ alignSelf:'center', fontFamily: 'Inter, sans-serif', fontSize: '12px' }}>Supported formats: JPEG, PNG, PDF, WORD</p>
                    </div>
                  </div>
                  <input type="file" style={{ display: 'none' }} accept="image/jpeg, image/png, application/pdf, application/msword" ref={fileInputRef} onChange={handleFileChange} />
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
                              <img onClick={openProfilePicChosser}  src={imageUrl || "/images/add_gallery.png"} alt="Profile" style={{ cursor: 'pointer', maxWidth: '100%', maxHeight: '100%' }} />
                            </div>
                            <p style={{ alignSelf:'center', color:'#707070', fontFamily: 'Inter, sans-serif', fontSize: '14px', marginTop: '10px', fontWeight:'600' }}>Upload a profile photo</p>
                            <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                              <label style={{ color:'#707070', fontWeight:'600' , marginBottom: '10px', fontFamily: 'Inter, sans-serif', fontSize: '14px' }} htmlFor="bioInput">Add a bio</label>
                              <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <textarea
                                  id="bioInput"
                                  onChange={(e) => setBio(e.target.value)}
                                  value={bio}
                                  style={{
                                    fontFamily: 'Inter, sans-serif',
                                    height: '100px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    resize: 'none',
                                    padding: '5px'
                                  }}
                                />
                                <p className='max-words'>300 words max</p>
                              </div>
                            </div>
                          </div><input type="file" style={{ display: 'none' }} accept="image/jpeg, image/png" ref={ppInputRef} onChange={handlePPChange} />
                  </div>
              )}

              <div className="navigation-buttons">
                <div></div>
                <button className="continue-button" onClick={handleContinue}>
                  {stage === 3 ? "Let's go" : "Continue"}
                </button>
              </div>
            
            <ToastContainer/>
            </div>
          </div>
        );
      }

      return (
      <div>
        {!isMobile && <Navbar /> }
        <div className="dialog-container">
          <div className="profile-dialog">
            {loading && <div><ToastContainer /><LoadingScreen/></div>} 
            <div style={{ width:'500px' }}>
              <div className='progress_bar'>

              </div>
              <div style={{ width:`${stage * 33}%` }} className='progress'></div>
            </div>
              {stage === 1 && (
                <div>
                  <h2>Set up your profile</h2>
                  <div className="input-row">
                      <div className="input-group">
                        <label>First Name</label>
                        <input onChange={(e) => setFirstname(e.target.value)} value={_firstname} placeholder={firstname === "" ? "Firstname" : firstname} type="text" />
                      </div>
                      <div className="input-group">
                        <label>Last Name</label>
                        <input onChange={(e) => setLastname(e.target.value)} value={_lastname} placeholder={lastname === "" ? "Lastname" : lastname} type="text" />
                      </div>
                  </div>
                  <div className="input-row">
                      <div className="input-group">
                        <label>Username</label>
                        <input onChange={(e) => setUsername(e.target.value)} disabled={account_type === "google" ? false : true } placeholder={username} value={username === "" ? _username : username}  type="text" />
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
                  <div style={{ height:'20px' }}/>
                  <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px'}}>Provide a verification document</label>
                  <div onDrop={handleDrop} onDragOver={handleDragOver} onClick={openFileChooser} style={{ cursor: 'pointer', marginTop: '10px', marginBottom: '30px', width: '100%', borderRadius: '4px', border: '1px dashed #F94F64', backgroundColor: isDragOver ? '#FEDCE0' : '#FEDCE045' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '16px' }}>
                      <img src="/images/export.png" alt="Upload Icon" style={{  width: '48px', height: '48px', color: '#F94F64' }} />
                      <p style={{ alignSelf:'center', fontWeight: '700', fontFamily: 'Inter, sans-serif', fontSize: '18px', marginTop: '8px', marginBottom: '8px' }}>
                        Drag & drop files or <span style={{ color: '#F94F64' }}>browse</span>
                      </p>
                      <p style={{ alignSelf:'center', fontFamily: 'Inter, sans-serif', fontSize: '12px' }}>Supported formats: JPEG, PNG, PDF, WORD</p>
                    </div>
                  </div>
                  <input type="file" style={{ display: 'none' }} accept="image/jpeg, image/png, application/pdf, application/msword" ref={fileInputRef} onChange={handleFileChange} />
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
                              <img onClick={openProfilePicChosser}  src={imageUrl || "/images/add_gallery.png"} alt="Profile" style={{ cursor: 'pointer', maxWidth: '100%', maxHeight: '100%' }} />
                            </div>
                            <p style={{ color:'#707070', fontWeight:'600' , fontFamily: 'Inter, sans-serif', fontSize: '14px', marginTop: '10px' }}>Upload a profile photo</p>
                            <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                              <label style={{ color:'#707070', fontWeight:'600' , marginBottom: '10px', fontFamily: 'Inter, sans-serif', fontSize: '14px' }} htmlFor="bioInput">Add a bio</label>
                              <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <textarea
                                  id="bioInput"
                                  onChange={(e) => setBio(e.target.value)}
                                  value={bio}
                                  style={{
                                    fontFamily: 'Inter, sans-serif',
                                    height: '100px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    resize: 'none',
                                    padding: '5px'
                                  }}
                                />
                                <p className='max-words'>300 words max</p>
                              </div>
                            </div>
                          </div><input type="file" style={{ display: 'none' }} accept="image/jpeg, image/png" ref={ppInputRef} onChange={handlePPChange} />
                  </div>
              )}


              <div className="navigation-buttons">
                <div></div>
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