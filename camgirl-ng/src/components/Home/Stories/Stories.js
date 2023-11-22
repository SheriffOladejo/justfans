import './Stories.css';
import React from 'react';
import { useState, useRef } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
//import 'react-horizontal-scrolling-menu/dist/styles.css';

function Stories () {

    const dummyData = [
      {
        id: 1,
        content: '/images/profile-picture.png',
      },
      {
        id: 2,
        content: '/images/profile-picture.png',
      },
      {
        id: 3,
        content: '/images/profile-picture.png',
      },
      {
        id: 4,
        content: '/images/profile-picture.png',
      },
      {
        id: 5,
        content: '/images/profile-picture.png',
      },
      {
        id: 6,
        content: '/images/profile-picture.png',
      },
      {
        id: 7,
        content: '/images/profile-picture.png',
      },
      {
        id: 8,
        content: '/images/profile-picture.png',
      },
      {
        id: 9,
        content: '/images/profile-picture.png',
      },
      {
        id: 10,
        content: '/images/profile-picture.png',
      },
      {
        id: 11,
        content: '/images/profile-picture.png',
      },
      {
        id: 12,
        content: '/images/profile-picture.png',
      },
      {
        id: 13,
        content: '/images/profile-picture.png',
      },
      {
        id: 14,
        content: '/images/profile-picture.png',
      },
      {
        id: 15,
        content: '/images/profile-picture.png',
      },
      {
        id: 16,
        content: '/images/profile-picture.png',
      },
      {
        id: 17,
        content: '/images/profile-picture.png',
      },
      {
        id: 18,
        content: '/images/profile-picture.png',
      },

    ];

    const [items, setItems] = React.useState(dummyData);
    const [selected, setSelected] = React.useState([]);
    const [position, setPosition] = React.useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    const isItemSelected = (id) => !!selected.find((el) => el === id);

    const handleClick =
        (id) =>
        ({ getItemById, scrollToItem }) => {
          const itemSelected = isItemSelected(id);

          setSelected((currentSelected) =>
            itemSelected
              ? currentSelected.filter((el) => el !== id)
              : currentSelected.concat(id)
          );
    };

    const RightArrow = () => {
      const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);
      return (
        <div
          onClick={() => scrollNext()}
          style={{
            width: '25px',
            cursor: 'pointer',
            height: '25px',
            backgroundColor: 'white',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '5px',
            marginLeft: '5px',
            padding: '10px'
          }}
        >
          <img
            src="/images/right-chevron.png"
            alt="Chevron Right"
            style={{ width: '10px', height: '10px' }}
          />
        </div>
      );
    };

    const LeftArrow = () => {
      const { isFirstItemVisible, scrollPrev } = React.useContext(VisibilityContext);
      return (
        <div
          onClick={() => scrollPrev()}
          style={{
            cursor: 'pointer',
            width: '25px',
            height: '25px',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%',
            marginTop: '5px',
            padding: '10px',
            marginRight: '5px',
          }}
        >
          <img
            src="/images/left-chevron.png"
            alt="Chevron Right"
            style={{ width: '10px', height: '10px' }}
          />
        </div>
      );
    };


    const StoryCard = ({ content, isActive }) => {
      return (
        <div className={`story-card ${isActive ? 'active' : ''}`}>
          <img src="/images/profile-picture.png" alt="Story" />
        </div>
      );
    };

    return (

    <div className="image-scrolling-menu" style={{ maxWidth: '600px' }}>
        
        <ScrollMenu
          LeftArrow={LeftArrow}
          RightArrow={RightArrow}
          arrowDisabledClass="arrow-disabled"
          hideArrows={false} // Set this to true if you want to hide the arrows
          alignCenter={true} // Set this to true if you want the menu to be centered
          wheel={true} // Set this to true if you want to enable scrolling with the mouse wheel
          translate={3}
        >
          {items.map(({ id, content, index }) => (
            <StoryCard
                key={id}
                content={content}
                isActive={index === currentIndex}
            />
          ))}
        </ScrollMenu>
    </div>
    );
}

export default Stories;
