import './FloatingButton.css';
import React, { useState, useEffect } from 'react';

function FloatingButton () {

    const [isButtonVisible, setButtonVisible] = useState(false);

    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setButtonVisible(true);
      } else {
        setButtonVisible(false);
      }
    };
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', 
      });
    };

    return (
        isButtonVisible && (
            <button className="floating-button" onClick={scrollToTop}>
              <img src='/images/up-arrow.png' alt='up'/>
            </button>
        )
    );
}

export default FloatingButton;