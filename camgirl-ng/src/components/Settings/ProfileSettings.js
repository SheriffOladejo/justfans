import './ProfileSettings.css';
import React, { useState } from 'react';

function ProfileSettings () {

    const [isEditDisplayName, setIsEditDisplayName] = useState(false);  
    const [usernameClassname, setUsernameClassname] = useState('profile-settings-username-container');

    const toggleDisplayNameEdit = () => {
        setIsEditDisplayName(!isEditDisplayName);
        if (isEditDisplayName) {
            setUsernameClassname('profile-settings-username-container-active');
        }
        else {
            setUsernameClassname('profile-settings-username-container-inactive');
        }
    }

    return (
        <div className='profile-settings-main-container'>
            <p className='profile-settings-title'>Profile settings</p>
            <div className='profile-picture-container'>
                <div className='profile-settings-cover-photo-container'>
                    <img alt='' className='profile-settings-gallery-add' src='/images/gallery-add.png'/>
                    <img alt='' className='profile-settings-cover-photo' src='/images/feed.png'/>
                </div>
                <div className="profile-settings-profile-picture">
                    <img alt='' className='profile-settings-gallery-add2' src='/images/gallery-add.png'/>
                    <img className='profile-settings-profile-picture-img' src="/images/profile-picture.png" alt="Profile" />
                </div>
            </div>
            <p className='profile-settings-field-title'>Username</p>
            <div className='profile-settings-username-container'>
                <input
                    placeholder="Sheriff Olad"
                    className='profile-settings-username'
                    disabled={!isEditDisplayName}
                />
                <img
                  src={isEditDisplayName ? '/images/pencil-black.png' : '/images/pencil.png'}
                  alt='Edit'
                  className="profile-settings-edit1"
                  onClick={toggleDisplayNameEdit}
                />
            </div>
            <p className='profile-settings-field-title'>Bio</p>
            <div className='profile-settings-username-container'>
                <textarea
                    rows="5"
                    cols="50"
                    placeholder="Sheriff Olad"
                    className='profile-settings-username'
                    disabled={!isEditDisplayName}
                />
                <img
                  src={isEditDisplayName ? '/images/pencil-black.png' : '/images/pencil.png'}
                  alt='Edit'
                  className="profile-settings-edit2"
                  onClick={toggleDisplayNameEdit}
                />
            </div>
            <p className='profile-settings-field-title'>Profile URL</p>
            <div className='profile-settings-profile-url-container'>
                <input
                    placeholder="Sheriff Olad"
                    className='profile-settings-username'
                    disabled={!isEditDisplayName}
                />
            </div>
            <p className='profile-settings-field-title'>Location</p>
            <div className='profile-settings-username-container'>
                <input
                    placeholder="Lagos, NG"
                    className='profile-settings-username'
                    disabled={!isEditDisplayName}
                />
                <img
                  src={'/images/chevron-down.png'}
                  alt='Select'
                  className="profile-settings-select"
                  onClick={toggleDisplayNameEdit}
                />
            </div>
            <p className='profile-settings-field-title'>D.O.B</p>
            <div className='profile-settings-username-container'>
                <input
                    placeholder="03/09/1999"
                    className='profile-settings-username'
                    disabled={!isEditDisplayName}
                />
                <img
                  src={'/images/chevron-down.png'}
                  alt='Select'
                  className="profile-settings-select"
                  onClick={toggleDisplayNameEdit}
                />
            </div>
            <div className='profile-settings-divider'></div>
            <div className='profile-settings-switch-creator'>
                <div className='profile-settings-switch-creator-container'>
                    <img className="profile-settings-creator" src='/images/profile.png'/>
                    <p className='profile-settings-field-title'>Switch to creator</p>
                </div>
                <img
                  src={'/images/chevron-right-black.png'}
                  alt='Select'
                  className="profile-settings-select"
                  onClick={toggleDisplayNameEdit}
                />
            </div>
        </div>
    );
}

export default ProfileSettings;