import React, { useState } from 'react';
import './Selector.css';

const Selector = ({ selectedOption, handleOptionChange }) => {

  return (
    <div className="selector-container">
      <div
        className={`option fan ${selectedOption === 'fan' ? 'selected' : ''}`}
        onClick={() => handleOptionChange('fan')}
      >
        <img
          className="icon"
          src={selectedOption === 'fan' ? '/images/people-white.png' : '/images/people-gray.png'}
          alt="Fan Icon"
        />
        <span className="text">Fan</span>
      </div>
      <div
        className={`option creator ${
          selectedOption === 'creator' ? 'selected' : ''
        }`}
        onClick={() => handleOptionChange('creator')}
      >
        <img
          className="icon"
          src={
            selectedOption === 'creator' ? '/images/people-white.png' : '/images/people-gray.png'
          }
          alt="Creator Icon"
        />
        <span className="text">Creator</span>
      </div>
    </div>
  );
};

export default Selector;
