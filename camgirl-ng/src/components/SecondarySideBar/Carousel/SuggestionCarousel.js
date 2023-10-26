import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './SuggestionCarousel.css';
import SuggestionItem from '../../Adapters/Suggestion/SuggestionItem';

const SuggestionCarousel = () => {

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

  const renderCustomDots = () => {
    const totalSlides = 3;
    const dots = [];

    for (let i = 0; i < totalSlides; i++) {
      dots.push(
        <span
          key={i}
          className={`custom-dot ${currentSlide === i ? 'active' : ''}`}
          onClick={() => handleSlideChange(i)}
        ></span>
      );
    }

    return dots;
  };

  return (
    <div>
      <div className="suggestion">
          <p style={{
           fontSize: '16px',
           fontFamily: 'Lato',
           color: '#000000',
           fontWeight: '600'}}>Suggestions</p>
          <div className="arrow-container">
              <div
               className="left-arrow prev"
               onClick={handlePrevClick}
               disabled={currentSlide === 0}>
               </div>
              <div
               className="right-arrow next"
               onClick={handleNextClick}
               disabled={currentSlide === 2}>
              </div>
          </div>
      </div>
      <div className="carousel-container">
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
            <SuggestionItem/>
            <SuggestionItem/>
            <SuggestionItem/>
            <SuggestionItem/>
          </div>
          <div>
            <SuggestionItem/>
            <SuggestionItem/>
            <SuggestionItem/>
            <SuggestionItem/>
          </div>
          <div>
            <SuggestionItem/>
            <SuggestionItem/>
            <SuggestionItem/>
            <SuggestionItem/>
          </div>
        </Carousel>
        <div className="custom-pagination">
          {renderCustomDots()}
        </div>
      </div>
    </div>
  );
};

export default SuggestionCarousel;
