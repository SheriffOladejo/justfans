import { FaBell } from 'react-icons/fa';
import { FiMessageSquare } from 'react-icons/fi';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import './Navbar.css';

function Navbar () {
    const notifCount = 300;
    const messageCount = 100;

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
            <div className='switch-desc-container'>
                <div className='switch-triangle'/>
                <div className='switch-desc'>
                    <p className='switch-desc-text'>Switch between creator and fan mode. First time creators are required to provide additional information to complete the process</p>
                    <img src='/images/close.png'  style={{width:'10px', height:'10px', cursor: 'pointer'}} />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;