import React from 'react';
import './FeedItem.css';
import ProfilePicture from '../../ProfilePicture/ProfilePicture';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { useRef } from 'react';
import DbHelper from '../../../utils/DbHelper';
import AppUser from '../../../models/AppUser';
import { isUserSignedIn } from '../../../utils/Utils';

function FeedItem({ post }) {

  const dbHelper = new DbHelper();

  const navigate = useNavigate();

  const openComment = (event) => {
    navigate('/post-comment', {state: {  }});
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

  useEffect(() => {
    const getCounts = () => {
      if (post.getLikes() !== null) {
        let likes = JSON.parse(post.getLikes()).length;
        if (likes > 0) {
          setLikesCount(`${likes}`);
        }
      }
      if (post.getComments() !== null) {
        let comments = JSON.parse(post.getComments()).comments.length;
        if (comments > 0) {
          setCommentsCount(`${comments}`);
        }
      }
    }
    getCounts();
  });

  useEffect(() => {
    const fetchUser = async () => {
      const signinData = isUserSignedIn();
      
      const username = signinData["username"];
      const email = signinData["email"];
      var _u = null;
      if (email === null) {
        _u = await dbHelper.getAppUserByUsername(username);
      }
      else {
        _u = await dbHelper.getAppUserByEmail(email);
      }
      setUser(_u);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const calculateTimeAgo = () => {
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - post.getCreationDate();

      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      let result = '';

      if (days > 0) {
        result = `${days}${days === 1 ? ' day' : ' days'} ago`;
      } else if (hours > 0) {
        result = `${hours}${hours === 1 ? 'hr' : 'hrs'} ago`;
      } else if (minutes > 0) {
        result = `${minutes}${minutes === 1 ? 'min' : 'min'} ago`;
      } else {
        result = `${seconds}${seconds === 1 ? 's' : 's'} ago`;
      }

      setTimeAgo(result);
    };

    calculateTimeAgo();
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
    console.log("post comment: " + post.getComments());
    console.log("post likes: " + post.getLikes());
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

  return (
    <div className="post-card">
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
