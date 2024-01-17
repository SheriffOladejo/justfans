import './Splash.css';
import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import SplashScreenWrapper from './SplashScreenWrapper';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const growShrink = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const AnimatedSplashScreen = styled.div`
  animation: ${growShrink} 3s ease-in-out infinite;
  padding: 20px;
  background-color: #ffffff;
  color: white;
  border-radius: 8px;
`;

function Splash () {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
          navigate('/signup');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <LoadingSpinner/>
    );
}

export default Splash;