import React from 'react';
import './FeedItem.css';
import ProfilePicture from '../../ProfilePicture/ProfilePicture';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { useRef } from 'react';

function FeedItem({ postId, profilePicture, displayName, username, postTime, caption, mediaUrl }) {

  const sendComment = (event) => {
    event.preventDefault();
  }

  const navigate = useNavigate();

  const openComment = (event) => {
    navigate('/post-comment', {state: {  }});
  }

  const textareaRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const [comment, setComment] = useState('');

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
    <div className="post-card">
      <div className="user-info">
        <ProfilePicture marginLeft="0px" zIndex={"0"}/>
        <div className="user-details">
          <div className="name-username">
            <p className="display-name">Sheriff</p>
            <img src="/images/verifiied.png" alt="Super user" className="verified"  />
            <p className="username">@deen</p>
          </div>
          <p className="post-time">2hr ago</p>
        </div>
      </div>
      <p className="caption">Pretty windy day today! Decided to go do some adventuring and shooting outdoors a bit today ❤️</p>
      <div className="media">
          <img src="/images/profile.png" alt="Post Media" className="post-image" />
      </div>
      <div className="divider"></div>
      <div className="emoji-container">
        <div className="emoji">😀</div>
        <div className="emoji">😂</div>
        <div className="emoji">😎</div>
        <div className="feeditem-text">Daniel jams and 20 others reacted</div>
      </div>
      <div className="reaction-container">
        <div className="reaction">
          <div className="reaction-icon">
            <img src="/images/like.png" alt="Like" />
          </div>
          <p className="reaction-text">Like</p>
        </div>
        <div onClick={openComment} className="reaction">
          <div className="reaction-icon">
            <img src="/images/comment.png" alt="Comment" style={{ marginTop: '5px' }} />
          </div>
          <p className="reaction-text">Comments</p>
        </div>
        <div className="reaction">
          <div className="reaction-icon">
            <img src="/images/tip.png" alt="Tip" />
          </div>
          <p className="reaction-text">Tip</p>
        </div>
        <div className="reaction">
          <div className="reaction-icon">
            <img src="/images/more.png" alt="More" />
          </div>
        </div>
      </div>
      <div className="feed-comment-container">
        <div style={{ width:'100%', display: 'flex', displayDirection: 'row', alignItems: 'center'}}>
          <img src="/images/profile-picture.png" alt={"Sheriff's Profile"} className="comment-user-profile-picture" />
          <div className="comment-box">
            <TextareaAutosize
              className="feed-item-input"
              placeholder="Add a comment"
              ref={textareaRef}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <a href='#' onClick={sendComment} style={{ paddingRight: '10px' }}>
              <img
                src="/images/send.png"
                alt="Send"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedItem;
