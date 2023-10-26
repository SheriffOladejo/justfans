import './PostComment.css';
import React from 'react';
import SideBar from '../SideBar/SideBar';
import Navbar from '../Navbar/Navbar';
import SecondarySideBar from '../SecondarySideBar/SecondarySideBar';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import PostCommentItem from '../Adapters/Post/PostComment';
import { useNavigate } from 'react-router-dom';

function PostComment ({comment_id}) {

    const commentData = [1,2,3,4,5,6,7,8,9,10];

    const navigate = useNavigate();

    const backPressed = () => {
      navigate(-1);
    };

    return (
        <div style={{ backgroundColor: '#EBEBEB', paddingBottom: '60px' }}>
            <Navbar/>
            <div className="post-comment-page">
              <SideBar pageIndex={1} />
              <div>
                <div className="post-back-container">
                    <div onClick={backPressed} className="post-comment-back-container">
                        <img className="post-comment-back-arrow" src="images/back-arrow.png"/>
                    </div>
                    <p className="back-post-text">Post</p>
                </div>
                <div className="post-comment-container">
                  <div className="post-comment-user-info">
                    <ProfilePicture marginLeft='0px' zIndex={"1"}/>
                    <div className="post-comment-user-details">
                      <div className="post-comment-name-username">
                        <p className="post-comment-display-name">Sheriff</p>
                        <img src="/images/verifiied.png" alt="Super user" className="post-comment-verified"  />
                        <p className="post-comment-username">@deen</p>
                      </div>
                      <p className="post-comment-post-time">2hr ago</p>
                    </div>
                  </div>
                  <p className="post-comment-caption">Pretty windy day today! Decided to go do some adventuring and shooting outdoors a bit today ❤️</p>
                  <div className="post-comment-media">
                      <img src="/images/feed.png" alt="Post Media" className="post-comment-post-image" />
                  </div>
                  <div className="post-comment-divider"></div>
                  <div className="post-comment-emoji-container">
                    <div className="post-comment-emoji">😀</div>
                    <div className="post-comment-emoji">😂</div>
                    <div className="post-comment-emoji">😎</div>
                    <div className="post-comment-text">Daniel jams and 20 others reacted</div>
                  </div>
                  <div className="post-comment-reaction-container">
                    <div className="post-comment-reaction">
                      <div className="post-comment-reaction-icon">
                        <img src="/images/like.png" alt="Like" />
                      </div>
                      <p className="post-comment-reaction-text">Like</p>
                    </div>
                    <div className="post-comment-reaction">
                      <div className="post-comment-reaction-icon">
                        <img src="/images/tip.png" alt="Tip" />
                      </div>
                      <p className="post-comment-reaction-text">Tip</p>
                    </div>
                    <div className="post-comment-reaction">
                      <div className="post-comment-reaction-icon">
                        <img src="/images/more.png" alt="More" />
                      </div>
                    </div>
                  </div>
                  <div className="post-comment-box">
                    <ProfilePicture hasStory={true} marginLeft="0px" marginRight="0px" zIndex={"1"}/>
                    <div style={{marginLeft:'0px', width: '430px', marginRight:'30px'}}>
                      <input className="post-comment-input" placeholder="Post your reply"/>
                    </div>
                    <div className="post-comment-reply-button-inactive">
                      <p className="post-comment-reply-button-text">Reply</p>
                    </div>
                  </div>
                  <div>
                    {commentData.map((item, index) => (
                      <PostCommentItem
                        key={index}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <SecondarySideBar/>
            </div>
        </div>
    );
}

export default PostComment;