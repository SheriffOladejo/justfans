import './LiveVideo.css';
import Navbar from '../Navbar/Navbar';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import CommentItem from '../Adapters/Live/CommentItem';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';


function LiveVideo () {

    const navigate = useNavigate();

    const backPressed = () => {
      navigate(-1);
    };

    const [sidebarHeight, setSidebarHeight] = useState(0);
    const sidebarRef = useRef(null);

    useEffect(() => {
      // Calculate the height of the live-video-sidebar
      if (sidebarRef.current) {
        setSidebarHeight(sidebarRef.current.clientHeight);
      }
    }, []);

    console.log(sidebarHeight);

const comments = [
  {
    user_id: 1,
    username: 'Daniel kalulaya oladejo deen sheriff',
    viewerCount: 100,
    comment: 'Love it 😍😍',
    storyCount: 0,
  },
  {
    user_id: 2,
    username: 'Alice',
    viewerCount: 50,
    comment: 'Great stream!',
    storyCount: 2,
  },
  {
    user_id: 3,
    username: 'Eva',
    viewerCount: 75,
    comment: 'Awesome content!',
    storyCount: 1,
  },
  {
    user_id: 4,
    username: 'John',
    viewerCount: 60,
    comment: 'Keep it up!',
    storyCount: 0,
  },
  {
    user_id: 5,
    username: 'Lisa',
    viewerCount: 45,
    comment: "You're doing great!",
    storyCount: 0,
  },
  {
    user_id: 6,
    username: 'Mike',
    viewerCount: 90,
    comment: 'Hello from Mike!',
    storyCount: 3,
  },
  {
    user_id: 7,
    username: 'Sarah',
    viewerCount: 55,
    comment: 'Enjoying the stream!',
    storyCount: 0,
  },
  {
    user_id: 8,
    username: 'Chris',
    viewerCount: 70,
    comment: 'Fantastic!',
    storyCount: 2,
  },
  {
    user_id: 9,
    username: 'Emily',
    viewerCount: 40,
    comment: 'Thumbs up!',
    storyCount: 0,
  },
  {
    user_id: 10,
    username: 'Alex',
    viewerCount: 110,
    comment: 'Greetings!',
    storyCount: 1,
  },
  {
    user_id: 11,
    username: 'Olivia',
    viewerCount: 85,
    comment: 'Loving it!',
    storyCount: 0,
  },
  {
    user_id: 12,
    username: 'Mark',
    viewerCount: 65,
    comment: 'You rock!',
    storyCount: 0,
  },
  {
    user_id: 13,
    username: 'Laura',
    viewerCount: 75,
    comment: 'Amazing stream!',
    storyCount: 1,
  },
  {
    user_id: 14,
    username: 'Ryan',
    viewerCount: 95,
    comment: 'Hi there!',
    storyCount: 0,
  },
  {
    user_id: 15,
    username: 'Sophia',
    viewerCount: 42,
    comment: 'Awesome!',
    storyCount: 0,
  },
  {
    user_id: 16,
    username: 'Matthew',
    viewerCount: 78,
    comment: "You're the best! You're the best! You're the best! You're the best! You're the best! You're the best! You're the best! You're the best! You're the best!",
    storyCount: 2,
  },
  {
    user_id: 15,
    username: 'Sophia',
    viewerCount: 42,
    comment: 'Awesome!',
    storyCount: 0,
  },
  {
    user_id: 15,
    username: 'Sophia',
    viewerCount: 42,
    comment: 'Awesome!',
    storyCount: 0,
  },
  {
    user_id: 15,
    username: 'Sophia',
    viewerCount: 42,
    comment: 'Awesome!',
    storyCount: 0,
  },
  {
    user_id: 15,
    username: 'Sophia',
    viewerCount: 42,
    comment: 'Awesome!',
    storyCount: 0,
  },
  {
    user_id: 15,
    username: 'Sophia',
    viewerCount: 42,
    comment: 'Awesome!',
    storyCount: 0,
  },
  {
    user_id: 15,
    username: 'Sophia',
    viewerCount: 42,
    comment: 'Awesome!',
    storyCount: 0,
  },
  {
    user_id: 15,
    username: 'Sophia',
    viewerCount: 42,
    comment: 'Awesome!',
    storyCount: 0,
  },
  {
    user_id: 15,
    username: 'Sophia',
    viewerCount: 42,
    comment: 'Awesome!',
    storyCount: 0,
  },
  {
    user_id: 15,
    username: 'Sophia',
    viewerCount: 42,
    comment: 'Awesome!',
    storyCount: 0,
  },
  {
    user_id: 15,
    username: 'Sophia',
    viewerCount: 42,
    comment: 'Awesomeness!',
    storyCount: 0,
  },
];

    return (
        <div style={{ backgroundColor: '#EBEBEB', paddingBottom: '60px' }}>
            <Navbar/>
            <div className="live-video-container">
                <div className="live-video-sidebar">
                  <div className="live-video-controls">
                      <div onClick={backPressed} className="live-video-back-arrow-container">
                        <img className="live-video-back-button" src="/images/back-arrow.png" alt="Arrow"/>
                      </div>
                      <div className="live-video-user-info">
                          <ProfilePicture zIndex={"1"}/>
                          <div className="live-video-user-details">
                              <div className="live-video-name-username">
                                  <p className="live-video-display-name">Sheriff</p>
                                  <img src="/images/verifiied.png" alt="Super user" className="live-video-verified"  />
                              </div>
                              <p className="live-video-username">@deen</p>
                          </div>
                          <div className="live-video-live-container">Live</div>
                          <div className="live-video-count-container">
                              <div className="live-video-count-container-row">
                                  <img src="/images/eye-white.png" className="live-video-count-container-eye"/>
                                  <p className="live-video-count-container-count">800</p>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="live-video-divider"/>
                  <p className="live-video-tips-received">Tips received</p>
                  <p className="live-video-tips-received-amount">GHC 6,000</p>
                  <div className="live-video-comment-list">
                    {comments.map((comment, index) => (
                      <CommentItem
                        key={index}
                        user_id={comment.user_id}
                        username={comment.username}
                        viewerCount={comment.viewerCount}
                        comment={comment.comment}
                        storyCount={comment.storyCount}
                      />
                    ))}
                  </div>
                  <div className="live-video-comment-container">
                      <div style={{ width:'100%', display: 'flex', displayDirection: 'row', alignItems: 'center'}}>
                        <div className="live-video-comment-box">
                          <input placeholder='Add a comment' className='live-video-comment-input' />
                          <a href='#' style={{ paddingRight: '10px' }}>
                            <img
                              src="/images/send.png"
                              alt="Send"
                            />
                          </a>
                        </div>
                      </div>
                  </div>
                </div>
                <div className="live-video-media">
                    <img src="/images/feed.png" alt="Post Media" className="live-dummy-image" />
                </div>
            </div>
        </div>
    );
}

export default LiveVideo;