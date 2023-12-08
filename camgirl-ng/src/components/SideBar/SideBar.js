import ProfilePicture from '../ProfilePicture/ProfilePicture';
import { useNavigate } from 'react-router-dom';
import './SideBar.css';
import DbHelper from '../../utils/DbHelper';
import Cookies from 'js-cookie';
import { isValidEmail } from '../../utils/Utils';
import React, { useState, useEffect } from 'react';

const SideBar = ({marginLeft, marginTop, pageIndex}) => {
  const dbHelper = new DbHelper();

  const [selectedLink, setSelectedLink] = useState(pageIndex);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleLinkClick = (index) => {
    setSelectedLink(index);
    if (index === 1) {
        navigate('/main-page', {state: {  }});
    }
    else if (index === 2) {
        navigate('/explore', {state: {  }});
    }
    else if (index === 3) {
        navigate('/dashboard', {state: {  }});
    }
    else if (index === 4) {
        navigate('/messages', {state: { }});
    }
    else if (index === 5) {
      navigate('/subscriptions', {state: { }});
    }
    else if (index === 6) {
      navigate('/settings', {state: { }});
    }
  };

  useEffect(() => {
    const username = Cookies.get('username');
    const fetchUser = async () => {
      const _u =  isValidEmail(username) ? await dbHelper.getAppUserByEmail(username) :await dbHelper.getAppUserByUsername(username);
      setUser(_u);
    };
    fetchUser();
}, []);

  return (
    <div className="sidebar" style={{ marginTop:`${marginTop}`, marginLeft:`${marginLeft}` }}>
      <div className="profile">
          <ProfilePicture zIndex={"1"}/>
          <div style={{ width:'180px' }}>
            <span className="sidebar-display-name">
              {user && user.getFirstName()} {user && user.getLastName()}
              {user && user.getVerified() === "true" && <img src="/images/verifiied.png" alt="Super user" className="sidebar-verified"  />}
            </span>
            <div className="sidebar-username">@{user && user.getUserName()}</div>
          </div>
      </div>
      <ul className="navigation-links">
        <li
          className={`nav-link ${selectedLink === 1 ? 'selected' : ''}`}
          onClick={() => handleLinkClick(1)}
        >
          {selectedLink === 1 && <img className="chevron" src="/images/chevron-right.png" alt="Chevron" />}
          <img src={selectedLink === 1 ? "/images/home-white.png" : "/images/home.png"} alt="Home" />
          <span>Home</span>
        </li>
        <li
          className={`nav-link ${selectedLink === 2 ? 'selected' : ''}`}
          onClick={() => handleLinkClick(2)}
        >
          {selectedLink === 2 && <img className="chevron" src="/images/chevron-right.png" alt="Chevron" />}
          <img src={selectedLink === 2 ? "/images/explore-white.png" : "/images/explore.png"} alt="Explore" />
          <span>Explore</span>
        </li>
        <li
          className={`nav-link ${selectedLink === 3 ? 'selected' : ''}`}
          onClick={() => handleLinkClick(3)}
        >
          {selectedLink === 3 && <img className="chevron" src="/images/chevron-right.png" alt="Chevron" />}
          <img src={selectedLink === 3 ? "/images/dashboard-white.png" : "/images/dashboard.png"} alt="Explore" />
          <span>Dashboard</span>
        </li>
        <li
          className={`nav-link ${selectedLink === 4 ? 'selected' : ''}`}
          onClick={() => handleLinkClick(4)}
        >
          {selectedLink === 4 && <img className="chevron" src="/images/chevron-right.png" alt="Chevron" />}
          <img src={selectedLink === 4 ? "/images/message-white.png" : "/images/message.png"} alt="Messages" />
          <span>Messages</span>
        </li>
        <li
          className={`nav-link ${selectedLink === 5 ? 'selected' : ''}`}
          onClick={() => handleLinkClick(5)}
        >
          {selectedLink === 5 && <img className="chevron" src="/images/chevron-right.png" alt="Chevron" />}
          <img src={selectedLink === 5 ? "/images/subscription-white.png" : "/images/subscription.png"} alt="Subscriptions" />
          <span>Subscriptions</span>
        </li>
        <li
          className={`nav-link ${selectedLink === 6 ? 'selected' : ''}`}
          onClick={() => handleLinkClick(6)}
        >
          {selectedLink === 6 && <img className="chevron" src="/images/chevron-right.png" alt="Chevron" />}
          <img src={selectedLink === 6 ? "/images/settings-white.png" : "/images/settings.png"} alt="Settings" />
          <span>Settings</span>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
