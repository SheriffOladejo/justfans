import React from 'react';
import './FeedItem.css';
import ProfilePicture from '../../ProfilePicture/ProfilePicture';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { useRef } from 'react';
import DbHelper from '../../../utils/DbHelper';
import AppUser from '../../../models/AppUser';
import { calculateTimeAgo, getAppUser } from '../../../utils/Utils';
import SendTipModal from '../../Modals/SendTipModal/SendTipModal';
import PostCommentModel from '../../../models/PostCommentModel';

function FeedItem({ post }) {

  const dbHelper = new DbHelper();

  const navigate = useNavigate();

  const openComment = (event) => {
    let post_id = post.getId();
    let owner_id = postOwner.getUserId();
    navigate('/post-comment', {state: {
      post_id,
      owner_id
    }});
  }

  const textareaRef = useRef(null);

  const [postOwner, setPostOwner] = useState(new AppUser());
  const [user, setUser] = useState(new AppUser());
  const [timeAgo, setTimeAgo] = useState('');

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const [likesCount, setLikesCount] = useState("");
  const [commentsCount, setCommentsCount] = useState("");

  const [likedByUser, setLikedByUser] = useState(false);

  const [comment, setComment] = useState('');

  const [showTipModal, setShowTipModal] = useState(false);
 
  useEffect(() => {
    const getLikesCounts = () => {
      if (post.getLikes() !== null) {
        let likes = JSON.parse(post.getLikes()).length;
        if (likes > 0) {
          setLikesCount(`${likes}`);
        }
        else {
          setLikesCount('');
        }
      }
    }
    getLikesCounts();
  }, [post.getLikes()]);

  useEffect(() => {
    const getCommentsCount = async () => {
      let count = await dbHelper.getCommentCountByPostID(post.getId());
      if (count !== 0) {
        setCommentsCount(`${count}`);
      }
    }

    getCommentsCount();
  }, []);
  
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
    setTimeAgo(calculateTimeAgo(post.getCreationDate()));
  }, []);

  useEffect(() => {
    const getUser = async () => {
      var _u = await dbHelper.getAppUserByID(post.getUserId());
      if (_u !== null) {
        var likes = post.getLikes();
        var likesArray = JSON.parse(likes);
        if (likesArray !== null) {
          if (likesArray.includes(_u.getUserId())) {
            setLikedByUser(true);
          }
        }
        setPostOwner(_u);
      }
    }
    getUser();
  },[]);

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

  const likePost = async () => {
    var likes = post.getLikes();
    
    if (likes === null) {
      likes = JSON.stringify([user.getUserId()]);
      post.setLikes(likes);
      await dbHelper.updatePost(post);
      setLikedByUser(true);
    }
    else {
      var likesArray = JSON.parse(likes);
      if (likesArray.includes(user.getUserId())) { // if user already liked post
        likesArray = likesArray.filter(element => element !== user.getUserId());
        likes = JSON.stringify(likesArray);
        post.setLikes(likes);
        await dbHelper.updatePost(post);
        setLikedByUser(false);
      }
      else {
        likesArray.push(user.getUserId());
        likes = JSON.stringify(likesArray);
        post.setLikes(likes);
        await dbHelper.updatePost(post);
        setLikedByUser(true);
      }
    }
    
  }

  const makeComment = async (event) => {
    event.preventDefault();
    let user_ids = JSON.stringify([]);
    let privacy = -1;
    let post_comment = new PostCommentModel(
      -1,
      user.getUserId(),
      comment,
      Date.now(),
      "false",
      post.getId(),
      "",
      "",
      user_ids,
      privacy
    );

    await dbHelper.createComment(post_comment);
    setComment("");
    let c = commentsCount + 1;
    setCommentsCount(`${c}`);
  }

  const closeTipModal = () => {
    setShowTipModal(false);
    document.body.style.overflow = "";
  };

  const openTipModal = () => {
    setShowTipModal(true);
    document.body.style.overflow = "hidden";
  };

  return (
    <div className="post-card">
      <SendTipModal isOpen={showTipModal} onClose={closeTipModal} currency={user.getCurrency()} currency_symbol={user.getCurrencySymbol()}></SendTipModal>
      <div className="user-info">
        <ProfilePicture url={postOwner.getProfilePicture()} marginLeft="0px" zIndex={"0"}/>
        <div className="user-details">
          <div className="name-username">
            <p className="display-name">{postOwner.getFirstName()} {postOwner.getLastName()}</p>
            <img src="/images/verifiied.png" alt="Super user" className="verified"  />
            <p className="username">{postOwner.getUserName()}</p>
          </div>
          <p className="post-time">{timeAgo}</p>
        </div>
      </div>
      <p className="caption">{post.getCaption()}</p>
      { post.getAttachmentFile() !== ''  && 
        <div className="media">
          <img src={post.getAttachmentFile()} alt="Post Media" className="post-image" />
        </div>
      }
      <div className="divider"></div>
      <div className="emoji-container">
        <div className="emoji">😀</div>
        <div className="emoji">😂</div>
        <div className="emoji">😎</div>
        <div className="feeditem-text">Daniel jams and 20 others reacted</div>
      </div>
      <div className="reaction-container">
        <div className="reaction" onClick={likePost}>
          <div className="reaction-icon">
            <img src={likedByUser ? "/images/like_red.png" : "/images/like.png"} alt="Like" />
          </div>
          <p className="reaction-text">{likesCount}</p>
        </div>
        <div onClick={openComment} className="reaction">
          <div className="reaction-icon">
            <img src="/images/comment.png" alt="Comment" style={{ marginTop: '5px' }} />
          </div>
          <p className="reaction-text">{commentsCount}</p>
        </div>
        <div onClick={openTipModal} className="reaction">
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
            <a href='#' onClick={makeComment} style={{ paddingRight: '10px' }}>
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
