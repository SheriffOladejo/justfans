import './AccountSettings.css';
import { useState } from 'react';

function AccountSettings () {

    const [isEditEmail, setIsEditEmail] = useState(false);  

    const toggleEmailEdit = () => {
        setIsEditEmail(!isEditEmail);
    }

    return (
        <div className='account-settings-main-container'>
            <p className='account-settings-title'>Account settings</p>
            <p className=' account-settings-field-title'>Email</p>
            <div className='account-settings-email-container'>
                <input
                    placeholder="sherifffoladejo@gmail.com"
                    className='account-settings-email'
                    disabled={!isEditEmail}
                />
                <img
                  src={isEditEmail ? '/images/pencil-black.png' : '/images/pencil.png'}
                  alt='Edit'
                  className="account-settings-edit1"
                  onClick={toggleEmailEdit}
                />
            </div>
            <p className='account-settings-field-title'>Recovery email</p>
            <div className='account-settings-email-container'>
                <input
                    placeholder="sherifffoladejo@gmail.com"
                    className='account-settings-email'
                    disabled={!isEditEmail}
                />
                <img
                  src={isEditEmail ? '/images/pencil-black.png' : '/images/pencil.png'}
                  alt='Edit'
                  className="account-settings-edit1"
                  onClick={toggleEmailEdit}
                />
            </div>
            <div className='account-option-container'>
              <p>Password</p>
              <img
                className='settings-option-arrow'
                src='/images/chevron-right-black.png'
                alt='Click'
              />
            </div>
            <div className='account-option-container'>
              <p>Two step authentication</p>
              <img
                className='settings-option-arrow'
                src='/images/chevron-right-black.png'
                alt='Click'
              />
            </div>
            <div className='account-settings-divider '></div>
            <div className='account-delete-option-container'>
              <p>Delete account</p>
              <img
                className='settings-option-arrow'
                src='/images/chevron-right-black.png'
                alt='Click'
              />
            </div>
        </div>
    );
}

export default AccountSettings;