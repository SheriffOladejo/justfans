import './ProfilePicture.css';
import Cookies from 'js-cookie';
import DbHelper from '../../utils/DbHelper';
import { isValidEmail } from '../../utils/Utils';
import React, { useState, useEffect } from 'react';

function ProfilePicture ({ 
    url,
    username, 
    handleClick,
    hasStory, 
    isOnline, 
    marginTop, 
    marginBottom, 
    marginLeft,
    zIndex }) {
    var boxShadow = "0 0 0 1px #ffffff";

    const dbHelper = new DbHelper();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const username = Cookies.get('username');
        const fetchUser = async () => {
          const _u =  isValidEmail(username) ? await dbHelper.getAppUserByEmail(username) :await dbHelper.getAppUserByUsername(username);
          setUser(_u);
        };
        fetchUser();
    }, []);

    if (!hasStory) {
        boxShadow = "0 0 0 1px #f94f64";
    }
    return (
        <div className="profile-picture" style={{ 
            boxShadow: `${boxShadow}`, 
            marginTop: `${marginTop}`, 
            marginBottom: `${marginBottom}`,  
            marginLeft: `${marginLeft}`,
            zIndex: `${zIndex}`,
            }}>
            <img src={url} alt="Profile" onClick={handleClick} />
          
          {/* <img src={user && user.getProfilePicture()} alt="Profile" /> */}
          <div className={`${isOnline ? 'online-indicator' : ''}`}></div>
        </div>
    );
}

export default ProfilePicture;
