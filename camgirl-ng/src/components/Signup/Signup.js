import './Signup.css';
import Login from '../Login/Login';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function Signup () {

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

  return (
    <div className='signup-row'>
      { (isDesktop || isTablet) && <div className="container">
        <div className='overlay'></div>
        <img src="/images/logo_small.png" className='login-logo-small' />
        <div style={{
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          fontSize:'18px',
          fontWeight:'500'
        }}>
          <img src="/images/logo_big.png" className='login-logo-big' />
          <p style={{ 
            fontFamily: 'Inter, sans',
            color: '#ffffff',
            zIndex: '1'
           }}>Join and support your favorite creators today.</p>
        </div>
      </div> }
      <Login/>
    </div>
  );
}

export default Signup;