import React from 'react';
import './FeedItem.css';
import ProfilePicture from '../../ProfilePicture/ProfilePicture';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { useRef } from 'react';
import DbHelper from '../../../utils/DbHelper';
import AppUser from '../../../models/AppUser';
import { isUserSignedIn, calculateTimeAgo, getAppUser } from '../../../utils/Utils';
import SendTipModal from '../../Modals/SendTipModal/SendTipModal';

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
    const getCounts = () => {
      if (post.getLikes() !== null) {
        let likes = JSON.parse(post.getLikes()).length;
        if (likes > 0) {
          setLikesCount(`${likes}`);
        }
        else {
          setLikesCount('');
        }
      }
      if (post.getComments() !== null) {
        let comments = JSON.parse(post.getComments()).comments.length;
        if (comments > 0) {
          setCommentsCount(`${comments}`);
        }
        else {
          setCommentsCount('');
        }
      }
    }
    getCounts();
  });
  
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
    if (post.getComments() === null && comment !== "") {
      let user_ids = [user.getUserId()];
      let privacy = -1;
      let comments = {
        id: Date.now(),
        user_id: user.getUserId(),
        comment: comment,
        creation_date: Date.now(),
        hidden: "false",
        parent_id: -1,
        likes: null
      };
      let comment_data = {
        user_ids: user_ids,
        privacy: privacy,
        comments: [comments]
      };
      post.setComments(JSON.stringify(comment_data));
      await dbHelper.updatePost(post);
      setComment("");
    }
    else if (post.getComments() !== null && comment !== "") {
      let comments_data = JSON.parse(post.getComments());
      var user_ids = comments_data.user_ids;
      if (!user_ids.includes(user.getUserId())) {
        user_ids.push(user.getUserId());
      }
      let comments = {
        id: Date.now(),
        user_id: user.getUserId(),
        comment: comment,
        creation_date: Date.now(),
        hidden: "false",
        parent_id: -1,
        likes: null
      };
      var comments_list = comments_data.comments;
      comments_list.push(comments);

      let comment_data = {
        user_ids: user_ids,
        privacy: comments_data.privacy,
        comments: comments_list
      }; 

      post.setComments(JSON.stringify(comment_data));
      await dbHelper.updatePost(post);
      setComment("");
    }
  }

  const closeTipModal = () => {
    setShowTipModal(false);
  };

  const openTipModal = () => {
    setShowTipModal(true);
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
