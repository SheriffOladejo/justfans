import React from 'react';
import SideBar from '../SideBar/SideBar';
import Home from '../Home/Home';
import Navbar from '../Navbar/Navbar';
import SecondarySideBar from '../SecondarySideBar/SecondarySideBar';
import './MainPage.css';
import FloatingButton from '../../utils/FloatingButton/FloatingButton';

const MainPage = () => {
  return (
  <div className="main-container">
    <Navbar/>
    <div className="main-page">
      <SideBar pageIndex={1} />
      <Home/>
      <SecondarySideBar marginTop='75px' />
    </div>
    <FloatingButton />
  </div>
  );
};

export default MainPage;
