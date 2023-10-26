import React, { useState } from 'react';
import './Settings.css';
import SideBar from '../SideBar/SideBar';
import Navbar from '../Navbar/Navbar';
import ProfileSettings from './ProfileSettings';
import FloatingButton from '../../utils/FloatingButton/FloatingButton';
import AccountSettings from './AccountSettings';
import PrivacySettings from './PrivacySettings';
import NotificationSettings from './NotificationSettings';

function Settings() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onItemSelected = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div style={{ backgroundColor: '#EBEBEB' }}>
      <Navbar />
      <div className='settings-page'>
        <SideBar pageIndex={6} />
        <div className='settings-main-container'>
          <div className='settings-title-container'>
            <p className='settings-title'>Settings</p>
          </div>
          <div className='settings-container'>
            <form className='settings-search-form'>
              <div className='settings-search-container'>
                <input
                  type='text'
                  placeholder='Search settings'
                  className='settings-search-input'
                />
                <img
                  src='/images/search-black.png'
                  alt='Search'
                  className='settings-search-icon'
                />
              </div>
            </form>
            <div
              onClick={() => onItemSelected(0)}
              className={`settings-option-container ${
                selectedIndex === 0 ? 'settings-option-container-selected' : ''
              }`}
            >
              <p>Profile</p>
              <img
                className='settings-option-arrow'
                src='/images/chevron-right-black.png'
                alt='Click'
              />
            </div>
            <div
              onClick={() => onItemSelected(1)}
              className={`settings-option-container ${
                selectedIndex === 1 ? 'settings-option-container-selected' : ''
              }`}
            >
              <p>Account</p>
              <img
                className='settings-option-arrow'
                src='/images/chevron-right-black.png'
                alt='Click'
              />
            </div>
            <div
              onClick={() => onItemSelected(2)}
              className={`settings-option-container ${
                selectedIndex === 2 ? 'settings-option-container-selected' : ''
              }`}
            >
              <p>Privacy & Safety</p>
              <img
                className='settings-option-arrow'
                src='/images/chevron-right-black.png'
                alt='Click'
              />
            </div>
            <div
              onClick={() => onItemSelected(3)}
              className={`settings-option-container ${
                selectedIndex === 3 ? 'settings-option-container-selected' : ''
              }`}
            >
              <p>Notifications</p>
              <img
                className='settings-option-arrow'
                src='/images/chevron-right-black.png'
                alt='Click'
              />
            </div>
          </div>
        </div>
        {selectedIndex === 0 && <ProfileSettings />}
        {selectedIndex === 1 && <AccountSettings />}
        {selectedIndex === 2 && <PrivacySettings />}
        {selectedIndex === 3 && <NotificationSettings />}
      </div>
      <FloatingButton />
    </div>
  );
}

export default Settings;
