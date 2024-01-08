import { FaBell } from 'react-icons/fa';
import { FiMessageSquare } from 'react-icons/fi';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import './Navbar.css';
import DbHelper from '../../utils/DbHelper';
import React, { useState, useEffect } from 'react';
import AppUser from '../../models/AppUser';
import { getAppUser } from '../../utils/Utils';
import MyDrawer from '../Drawer/Drawer';

function Navbar () {
    const dbHelper = new DbHelper();
    const notifCount = 300;
    const messageCount = 100;

    const [user, setUser] = useState(new AppUser()); 
    const [showCreatorDesc, setShowCreatorDesc] = useState(true);

    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    const [toggleDrawer, setToggleDrawer] = useState(false);

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

    useEffect(() => {
        
    }, [toggleDrawer]);

    useEffect(() => {
        const fetchUser = async () => {
          const _u = await getAppUser();
          setUser(_u);
        };
        fetchUser();
    }, []);

    const handleDescDismissed = () => {
        setShowCreatorDesc(false);
        user.setCreatorModeDescDismissed("true");
        dbHelper.updateUser(user);
    }

    const openDrawer = () => {
        setToggleDrawer(true);
    }

    const closeDrawer = () => {
        setToggleDrawer(false);
    }

    if (isMobile) {
        return (
            <nav className='navbar'>
                <div className='mobile-nav-container'>
                    <ProfilePicture url={user.getProfilePicture()} handleClick={openDrawer} marginLeft='0px'/>
                    <img src="/images/justfans_black_red.png"/>
                    <div>
                        <label className="switch">
                            <input type="checkbox" className="switch-input" />
                            <span className="switch-slider">
                                <img src="/images/switch-image.png" alt="Switch" className="switch-image" />
                            </span>
                        </label>
                        {user && user.getCreatorModeDescDismissed() === "" && showCreatorDesc &&(
                        <div className='switch-desc-container'>
                            <div className='switch-triangle'/>
                            <div className='switch-desc'>
                            <p className='switch-desc-text'>Switch between creator and fan mode. First time creators are required to provide additional information to complete the process</p>
                            <img
                                src='/images/close.png'
                                style={{ width: '10px', height: '10px', cursor: 'pointer' }}
                                onClick={handleDescDismissed}
                            />
                            </div>
                        </div>
                        )}
                    </div>
                </div>
                <MyDrawer close={closeDrawer} toggle={toggleDrawer} />
            </nav>
        );
    }

    return (
        <nav className="navbar">
            <div className="logo">
                <img src="/images/logo102.png" alt="Logo" />
            </div>
            <div className="navbar-controls">
                <form>
                    <div className="search-container">
                        <input type="text" placeholder="Search posts, creators" className="search-input" />
                        <img src="/images/search-normal.png" alt="Search" className="search-icon" />
                    </div>
                </form>
                <div className="icon-container">
                    <FiMessageSquare className="icons-button"/>
                    <span className="counter">{messageCount}</span>
                </div>
                <div className="icon-container">
                    <FaBell className="icons-button"/>
                    <span className="counter">{notifCount}</span>
                </div>
                <label className="switch">
                    <input type="checkbox" className="switch-input" />
                    <span className="switch-slider">
                        <img src="/images/switch-image.png" alt="Switch" className="switch-image" />
                    </span>
                </label>
                <ProfilePicture/>
            </div>
            {user && user.getCreatorModeDescDismissed() === "" && showCreatorDesc &&(
            <div className='switch-desc-container'>
                <div className='switch-triangle'/>
                <div className='switch-desc'>
                <p className='switch-desc-text'>Switch between creator and fan mode. First time creators are required to provide additional information to complete the process</p>
                <img
                    src='/images/close.png'
                    style={{ width: '10px', height: '10px', cursor: 'pointer' }}
                    onClick={handleDescDismissed}
                />
                </div>
            </div>
            )}
        </nav>
    );
}

export default Navbar;