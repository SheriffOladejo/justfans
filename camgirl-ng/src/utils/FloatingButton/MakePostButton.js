import './MakePostButton.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MakePostButton () {

    const navigate = useNavigate();

    const openPage = () => {
        navigate('/create-post');
    }

    return (
        <button onClick={openPage} className="make-post-button">
            <img className='makepost-icon' src='/images/plus.png' alt='plus'/>
        </button>
    );
}

export default MakePostButton;