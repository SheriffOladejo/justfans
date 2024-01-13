import './PostCommentItem.css';
import ProfilePicture from '../../ProfilePicture/ProfilePicture';
import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { calculateTimeAgo, formatNumber } from '../../../utils/Utils';
import AppUser from '../../../models/AppUser';
import DbHelper from '../../../utils/DbHelper';
import ReplyCommentModal from '../../Modals/ReplyCommentModal/ReplyCommentModal';

function PostCommentItem ({comment, index}) {

    const [owner, setOwner] = useState(new AppUser());
    const [likesCount, setLikesCount] = useState('');

    const [showReplyModal, setShowReplyModal] = useState(false);

    const [likedByUser, setLikedByUser] = useState(false);

    let dbHelper = new DbHelper();

    const closeReplyModal = () => {
      setShowReplyModal(false);
      document.body.style.overflow = "";
    };
  
    const openReplyModal = () => {
      setShowReplyModal(true);
      document.body.style.overflow = "hidden";
    };

    useEffect(() => {
      const getUser = async () => {
        let user = await dbHelper.getAppUserByID(comment.getUserId());
        
        if (user !== null) {
          setOwner(user);
          if (comment.getLikes() !== null && comment.getLikes() !== undefined) {
            let likes = JSON.parse(comment.getLikes()).length;
            if (likes > 0) {
              setLikesCount(`${formatNumber(likes)}`);
            }
            else {
              setLikesCount('');
            }
          }
        }
      }
      getUser();
    },[]);

    return (
        <div className="post-comment-item-container">
          <ReplyCommentModal
            isOpen={showReplyModal} 
            onClose={closeReplyModal} 
            comment={comment}
            owner={owner} ></ReplyCommentModal>
          <div className="post-comment-user-info">
            <ProfilePicture url={owner.getProfilePicture()} marginLeft='0px' zIndex={"1"}/>
            <div className="post-comment-user-details">
              <div className="post-comment-name-username">
                <p className="post-comment-display-name">{''+owner.getFirstName() + ' ' + owner.getLastName()}</p>
                <img src="/images/verifiied.png" alt="Super user" className="post-comment-verified"  />
                <p className="post-comment-username">@{owner.getUserName()}</p>
              </div>
              <p className="post-comment-post-time">{calculateTimeAgo(comment.getCreationDate())}</p>
            </div>
          </div>
          <p className="post-comment-item-caption">{comment.getComment()}</p>
          <div className="post-comment-item-reaction-container">
            <div className="post-comment-item-reaction">
                <div className="post-comment-like-container">
                  <img className="post-comment-like" src="/images/like.png" alt="Like"/>
                </div>
                <p className="post-likes">{likesCount}</p>
                <p className="post-comment-reply" onClick={openReplyModal}>Reply</p>
            </div>
            <div  className="post-comment-like-container">
              <img src="/images/more.png" alt="More" />
            </div>
          </div>
        </div>
    );
}

export default PostCommentItem;