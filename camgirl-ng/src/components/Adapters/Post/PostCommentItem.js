import './PostCommentItem.css';
import ProfilePicture from '../../ProfilePicture/ProfilePicture';
import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { calculateTimeAgo, formatNumber, getAppUser } from '../../../utils/Utils';
import AppUser from '../../../models/AppUser';
import DbHelper from '../../../utils/DbHelper';
import ReplyCommentModal from '../../Modals/ReplyCommentModal/ReplyCommentModal';

function PostCommentItem ({comment, index, post}) {

    const [owner, setOwner] = useState(new AppUser());
    const [user, setUser] = useState(new AppUser());
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

    const callback = (likedByUser, likeCount) => {
      setLikedByUser(likedByUser);
      setLikesCount(likeCount);
    }

    const likeComment = async () => {
      var likes = comment.getLikes();
    
      if (likes === null || likes === "") {
        likes = JSON.stringify([user.getUserId()]);
        comment.setLikes(likes);
        await dbHelper.updateComment(comment);
        setLikedByUser(true);
      }
      else {
        var likesArray = JSON.parse(likes);
        if (likesArray.includes(user.getUserId())) { // if user already liked post
          likesArray = likesArray.filter(element => element !== user.getUserId());
          likes = JSON.stringify(likesArray);
          comment.setLikes(likes);
          
          await dbHelper.updateComment(comment);
          setLikedByUser(false);
        }
        else {
          likesArray.push(user.getUserId());
          likes = JSON.stringify(likesArray);
          comment.setLikes(likes);

          await dbHelper.updateComment(comment);
          setLikedByUser(true);
        }
      }

      if (comment.getLikes() !== null && comment.getLikes() !== undefined && comment.getLikes() !== "") {
        let likes = JSON.parse(comment.getLikes()).length;
        if (likes > 0) {
          setLikesCount(`${formatNumber(likes)}`);
        }
        else {
          setLikesCount('');
        }
      }
    }

    useEffect(() => {
      const fetchUser = async () => {
        let user = await getAppUser();
        user.setCurrency("NGN");
        user.setCurrencySymbol("\u20A6");
  
        setUser(user);
      };
      fetchUser();
    }, []);

    useEffect(() => {
      const getUser = async () => {
        let _u = await dbHelper.getAppUserByID(comment.getUserId());
        
        if (_u !== null) {
          setOwner(_u);
          if (comment.getLikes() !== null && comment.getLikes() !== undefined && comment.getLikes() !== "") {
            let likes = JSON.parse(comment.getLikes()).length;
            if (likes > 0) {
              setLikesCount(`${formatNumber(likes)}`);
              if (JSON.parse(comment.getLikes()).includes(user.getUserId())) {
                setLikedByUser(true);
              }
            }
            else {
              setLikesCount('');
            }
          }
        }
      }
      getUser();
    },[user]);

    return (
        <div className="post-comment-item-container">
          <ReplyCommentModal
            isOpen={showReplyModal} 
            onClose={closeReplyModal} 
            callback={callback}
            comment={comment}
            owner={owner}
            user={user} />
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
          <p className="post-comment-item-caption">{comment.getCaption()}</p>
          <div className="post-comment-item-reaction-container">
            <div className="post-comment-item-reaction">
                <div className="post-comment-like-container" onClick={likeComment}>
                  <img className="post-comment-like" src={likedByUser ? "/images/like_red.png" : "/images/like.png"} alt="Like" />
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