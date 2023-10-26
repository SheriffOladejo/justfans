import Stories from '../Home/Stories/Stories';
import './Home.css';
import FeedItem from '../Home/Feed/FeedItem';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

function Home () {

    const [postText, setPostText] = useState('');
    const [textareaStyle, setTextareaStyle] = useState({});

    const handleTextChange = (event) => {
      setPostText(event.target.value);
  
      // Use setTimeout to ensure smoother resizing
      setTimeout(() => {
        const { scrollHeight, clientHeight } = event.target;
        setTextareaStyle({
          height: scrollHeight > clientHeight ? `${scrollHeight}px` : 'auto',
        });
      }, 0.1);
    };

    const showFilterOptions = (event) => {
        event.preventDefault();
    }

    const feedData = [
      {
        profilePicture: "/images/profile-picture.png",
        displayName: "Sheriff",
        username: "@deen",
        postTime: "2hr ago",
        caption: "Pretty windy day today! Decided to go do some adventuring and shooting outdoors a bit today ❤️",
        mediaUrl: "/images/feed.png",
      },
      {
        profilePicture: "/images/profile-picture.png",
        displayName: "Sheriff",
        username: "@deen",
        postTime: "2hr ago",
        caption: "Pretty windy day today! Decided to go do some adventuring and shooting outdoors a bit today ❤️",
        mediaUrl: "/images/feed.png",
      },
    ];

    return (
        <div className="home-container">
            <Stories />
            <div className="create-post-container">
                <div className="textfield-and-profile">
                    <ProfilePicture marginTop="15px" zIndex={"1"}/>
                    <TextareaAutosize
                      className="textfield"
                      placeholder="Create post"
                    />
                </div>
                <div className="element-container">
                  <div className="element">
                    <img src="/images/gallery.png" alt="Image" />
                    <p className="post-media">Image</p>
                  </div>
                  <div className="element">
                    <img src="/images/video.png" alt="Video" />
                    <p className="post-media">Video</p>
                  </div>
                  <div className="element">
                    <img src="/images/play-cricle.png" alt="Live Video" />
                    <p className="post-media">Start Live</p>
                  </div>
                </div>
            </div>
            <div className='filter-posts'>
              <img src="/images/filter.png" alt="Filter" style={{ width: '16px', height: '16px' }} />
              <p style={{ fontSize: '13px', fontWeight: '400', fontFamily: 'Inter' }}>Filter posts:</p>
              <p style={{ fontSize: '13px', fontWeight: '400', fontFamily: 'Inter', marginLeft: '5px' }}>Free</p>
              <a href='#' onClick={showFilterOptions} style={{ paddingRight: '10px' }}>
                <img src="/images/chevron-down.png" alt="Filter" style={{ width: '10px', height: '10px', marginLeft: '5px' }} />
              </a>
            </div>
            <div style={{ width: '100%', height: '0.1px', backgroundColor: 'grey', marginBottom: '25px' }}/>
            <div>
              {feedData.map((item, index) => (
                <FeedItem
                  key={index}
                  profilePicture={item.profilePicture}
                  displayName={item.displayName}
                  username={item.username}
                  postTime={item.postTime}
                  caption={item.caption}
                  mediaUrl={item.mediaUrl}
                />
              ))}
            </div>
        </div>
    );
}

export default Home;