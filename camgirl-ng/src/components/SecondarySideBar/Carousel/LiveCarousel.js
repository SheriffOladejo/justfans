import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './LiveCarousel.css';
import LiveItem from '../../Adapters/Live/LiveItem';

const LiveCarousel = () => {

  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevClick = () => {
    setCurrentSlide(currentSlide - 1);
  };

  const handleNextClick = () => {
    setCurrentSlide(currentSlide + 1);
  };

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const renderLiveCustomDots = () => {
    const totalSlides = 3;
    const dots = [];

    for (let i = 0; i < totalSlides; i++) {
      dots.push(
        <span
          key={i}
          className={`live-carousel-custom-dot ${currentSlide === i ? 'active' : ''}`}
          onClick={() => handleSlideChange(i)}
        ></span>
      );
    }

    return dots;
  };

  return (
    <div>
      <div className="live-carousel">
          <p style={{
           fontSize: '16px',
           fontFamily: 'Lato',
           color: '#000000',
           fontWeight: '600'}}>Join Live</p>
          <div className="live-carousel-arrow-container">
              <div
               className="live-carousel-left-arrow prev"
               onClick={handlePrevClick}
               disabled={currentSlide === 0}>
               </div>
              <div
               className="live-carousel-right-arrow next"
               onClick={handleNextClick}
               disabled={currentSlide === 2}>
              </div>
          </div>
      </div>
      <div className="live-carousel-container">
        <Carousel
          selectedItem={currentSlide}
          onChange={handleSlideChange}
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          showIndicators={false}
          infiniteLoop={true}
          dynamicHeight={false}
          emulateTouch={true}
        >

          <div>
            <div className='live-carousel-row'>
                <LiveItem/>
                <LiveItem/>
            </div>
            <div className='live-carousel-row'>
                <LiveItem/>
                <LiveItem/>
            </div>
            <div className='live-carousel-row'>
                <LiveItem/>
                <LiveItem/>
            </div>
          </div>
          <div>
            <div className='live-carousel-row'>
                <LiveItem/>
                <LiveItem/>
            </div>
            <div className='live-carousel-row'>
                <LiveItem/>
                <LiveItem/>
            </div>
            <div className='live-carousel-row'>
                <LiveItem/>
                <LiveItem/>
            </div>
          </div>
          <div>
            <div className='live-carousel-row'>
                <LiveItem/>
                <LiveItem/>
            </div>
            <div className='live-carousel-row'>
                <LiveItem/>
                <LiveItem/>
            </div>
            <div className='live-carousel-row'>
                <LiveItem/>
                <LiveItem/>
            </div>
          </div>
        </Carousel>
        <div className="live-carousel-custom-pagination">
          {renderLiveCustomDots()}
        </div>
      </div>
    </div>
  );
};

export default LiveCarousel;
