import React from 'react';
import { useState, useEffect } from 'react';
import SideBar from '../SideBar/SideBar';
import Home from '../Home/Home';
import Navbar from '../Navbar/Navbar';
import SecondarySideBar from '../SecondarySideBar/SecondarySideBar';
import './MainPage.css';
import FloatingButton from '../../utils/FloatingButton/FloatingButton';
import MakePostButton from '../../utils/FloatingButton/MakePostButton';


const MainPage = () => {

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setIsMobile(true);
        setIsDesktop(false);
        setIsTablet(false);
      } else if (window.innerWidth <= 1024) {
        setIsTablet(true);
        setIsMobile(false);
        setIsDesktop(false);
      }
      else {
        setIsDesktop(true);
        setIsMobile(false);
        setIsTablet(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, []);

  if (isMobile) {
    return (
      <div className='main-container'>
        <Navbar/>
        <div className='main-page'>
          <Home/>
        </div>
        <MakePostButton />
        <FloatingButton />
      </div>
    );
  }


  return (
    <div className="main-container">
      <Navbar/>
      <div className="main-page">
        <SideBar marginTop='40px' pageIndex={1} />
        <Home/>
        <SecondarySideBar marginTop='50px' />
      </div>
      <FloatingButton />
    </div>
  );
};

export default MainPage;
