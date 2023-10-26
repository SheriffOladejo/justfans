import './LiveItem.css';
import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LiveItem() {

    const navigate = useNavigate();

    const openLive = (event) => {
        navigate('/live-video', {state: {  }});
    };

  return (
    <div onClick={openLive} className="liveitem-container">
      <div className="live-item-tag">Live</div>
      <div className="live-picture">
        <img src="/images/profile-picture.png" alt="Profile" />
      </div>
    </div>
  );
}

export default LiveItem;
