import React from 'react';
import './LoadingScreen.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function LoadingScreen({ width, left }) {

  const percentage = 66;

  return (
    <div className="loading-screen" style={{ width:`${width}`, left:`${left}` }}>
      <img src="/images/logo102.png" alt="Logo" className="logo" />
      <div className="circular-progress">
        <div className="inner"></div>
        <div className="outer"></div>
      </div>
    </div>
  );
}

export default LoadingScreen;
