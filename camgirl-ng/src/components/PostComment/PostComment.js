import './PostComment.css';
import React from 'react';
import SideBar from '../SideBar/SideBar';
import Navbar from '../Navbar/Navbar';
import SecondarySideBar from '../SecondarySideBar/SecondarySideBar';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import PostCommentItem from '../Adapters/Post/PostCommentItem';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { scrollToTop, calculateTimeAgo } from '../../utils/Utils';
import { useLocation } from 'react-router-dom';
import Post from '../../models/Post';
import AppUser from '../../models/AppUser';
import { isUserSignedIn, getAppUser } from '../../utils/Utils';
import { ToastContainer, toast } from 'react-toastify';
import ReactPlayer from 'react-player';
import DbHelper from '../../utils/DbHelper';
import { ATTACHMENT_GIF, ATTACHMENT_IMAGE, ATTACHMENT_VIDEO } from '../../utils/Constants';
import SendTipModal from '../Modals/SendTipModal/SendTipModal';
import PostCommentModel from '../../models/PostCommentModel';

function PostComment () {

    let dbHelper = new DbHelper();

    const location = useLocation();
    const { 
      post_id = '',
      owner_id = ''
    } = location.state || {};
    
    const commentData = [1,2,3,4,5,6,7,8,9,10];

    const [postComments, setPostComments] = useState([])
    const [imageAttachment, setImageAttachment] = useState(null);
    const [videoAttachment, setVideoAttachment] = useState(null);
    const [gifAttachment, setGifAttachment] = useState(null);

    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    const [comment, setComment] = useState('');
    const [likesCount, setLikesCount] = useState("");
    const [commentsCount, setCommentsCount] = useState("");
    
    const [post, setPost] = useState(new Post());
    const [postOwner, setPostOwner] = useState(new AppUser());
    const [postTimeAgo, setPostTimeAgo] = useState('');
    const [user, setUser] = useState(new AppUser());

    const [likedByUser, setLikedByUser] = useState(false);

    const [showTipModal, setShowTipModal] = useState(false);

    const textareaRef = useRef(null);



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

    useEffect(() => {
      const getPost = async () => {
        const signinData = isUserSignedIn();
          
        const username = signinData["username"];
        const email = signinData["email"];

        var _u = await getAppUser();
        
        if (_u !== null) {
          setPostOwner(_u);
          let post = await dbHelper.getPostByID(post_id);
          setPost(post);
          setPostTimeAgo(calculateTimeAgo(post.getCreationDate()));

          var likes = post.getLikes();
          var likesArray = JSON.parse(likes);
          if (likesArray !== null) {
            if (likesArray.includes(_u.getUserId())) {
              setLikedByUser(true);
            }
          }

          if (post.getComments() !== null) {
            let comments = JSON.parse(post.getComments()).comments;
            var arr = [];
            for (let i = 0; i < comments.length; i++) {
              let commentModel = new PostCommentModel(
                comments[i].id,
                comments[i].user_id,
                comments[i].comment,
                comments[i].creation_date,
                comments[i].hidden,
                comments[i].parent_id,
                comments[i].likes
              );
              arr.push(commentModel);
            }
            setPostComments(arr);
          }

          if (post.getAttachmentType() === ATTACHMENT_GIF) {
            setGifAttachment(ATTACHMENT_GIF);
          }
          else if (post.getAttachmentType === ATTACHMENT_IMAGE) {
            setImageAttachment(ATTACHMENT_IMAGE);
          }
          else if (post.getAttachmentType === ATTACHMENT_VIDEO) {
            setVideoAttachment(ATTACHMENT_VIDEO);
          }

        }
        else {
          
        }
      }

      getPost();

    }, []);

    useEffect(() => {
      const getComments = async () => {
        let comments = JSON.parse(post.getComments()).comments

      }
    }, []);

    useEffect(() => {
      const fetchUser = async () => {
        let user = await getAppUser();
        setUser(user);
      };
      fetchUser();
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

      var likes = post.getLikes();
      console.log("post likes: " + post.getLikes());
      var likesArray = JSON.parse(likes);
      if (likesArray !== null) {
        if (likesArray.includes(user.getUserId())) {
          setLikedByUser(true);
        }
      }
      
    }

    useEffect(() => {
      const getCounts = () => {
        
        if (post.getLikes() !== null && post.getLikes() !== undefined) {
          let likes = JSON.parse(post.getLikes()).length;
          if (likes > 0) {
            setLikesCount(`${likes}`);
          }
          else {
            setLikesCount('');
          }
        }
        if (post.getComments() !== null && post.getComments()) {
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

    const navigate = useNavigate();

    const backPressed = () => {
      navigate(-1);
    };

    const closeTipModal = () => {
      setShowTipModal(false);
      document.body.style.overflow = "";
    };
  
    const openTipModal = () => {
      setShowTipModal(true);
      document.body.style.overflow = "hidden";
    };
  
    const makeComment = async (event) => {
      event.preventDefault();
      if (comment !== '') {
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
          var arr = [];
          for (let i = 0; i < postComments.length; i++) {
            let commentModel = new PostCommentModel(
              postComments[i].id,
              postComments[i].user_id,
              postComments[i].comment,
              postComments[i].creation_date,
              postComments[i].hidden,
              postComments[i].parent_id,
              postComments[i].likes
            );
            arr.push(commentModel);
          }
          arr.push(new PostCommentModel(
            comments.id, 
            comments.user_id, 
            comments.comment, 
            comments.creation_date, 
            comments.hidden, 
            comments.likes
          ));
          setPostComments(arr);
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
          var arr = [];
          for (let i = 0; i < postComments.length; i++) {
            let commentModel = new PostCommentModel(
              postComments[i].id,
              postComments[i].user_id,
              postComments[i].comment,
              postComments[i].creation_date,
              postComments[i].hidden,
              postComments[i].parent_id,
              postComments[i].likes
            );
            arr.push(commentModel);
          }
          arr.push(new PostCommentModel(
            comments.id, 
            comments.user_id, 
            comments.comment, 
            comments.creation_date, 
            comments.hidden, 
            comments.likes
          ));
          setPostComments(arr);
          setComment("");
          
        }
      }
    }

    scrollToTop(window);

    return (
        <div className='comment-page-container'>
          <SendTipModal isOpen={showTipModal} onClose={closeTipModal} currency={user.getCurrency()} currency_symbol={user.getCurrencySymbol()}></SendTipModal>
            {!isMobile && <Navbar/>}
            <div className={isMobile ? '' : 'post-comment-page'} >
              { !isMobile && <SideBar pageIndex={1} /> }
              <div>
                <div className="post-back-container">
                    <div onClick={backPressed} className="post-comment-back-container">
                        <img className="post-comment-back-arrow" src="images/back-arrow.png"/>
                    </div>
                    <p className="back-post-text">Post</p>
                </div>
                <div className="post-comment-container">
                  <div className="post-comment-user-info">
                    <ProfilePicture url={postOwner.getProfilePicture()} marginLeft='0px' zIndex={"1"}/>
                    <div className="post-comment-user-details">
                      <div className="post-comment-name-username">
                        <p className="post-comment-display-name">{''+postOwner.getFirstName()+' '+postOwner.getLastName()}</p>
                        <img src="/images/verifiied.png" alt="Super user" className="post-comment-verified"  />
                        <p className="post-comment-username">{postOwner.getUserName()}</p>
                      </div>
                      <p className="post-comment-post-time">{postTimeAgo}</p>
                    </div>
                  </div>
                  <p className="post-comment-caption">{post.getCaption()}</p>
                  <div className="post-comment-media">
                    { (gifAttachment || imageAttachment) && 
                      <img className="home-post-attachment-media" 
                      src={post.getAttachmentFile}/> 
                    }
                    { videoAttachment && 
                      <ReactPlayer
                        url={post.getAttachmentFile}
                        controls={true}
                        width="100%"
                        max-height="auto"
                      /> 
                    }
                  </div>
                  <div className="post-comment-divider"></div>
                  <div className="post-comment-emoji-container">
                    <div className="post-comment-emoji">😀</div>
                    <div className="post-comment-emoji">😂</div>
                    <div className="post-comment-emoji">😎</div>
                    <div className="post-comment-text">Daniel jams and 20 others reacted</div>
                  </div>
                  <div className="post-comment-reaction-container">
                    <div onClick={likePost} className="post-comment-reaction">
                      <div className="post-comment-reaction-icon">
                        <img src={likedByUser ? "/images/like_red.png" : "/images/like.png"} alt="Like" />
                      </div>
                      <p className="post-comment-reaction-text">{likesCount}</p>
                    </div>
                    <div className="post-comment-reaction">
                      <div className="post-comment-reaction-icon">
                        <img src="/images/comment.png" alt="Comment" />
                      </div>
                      <p className="post-comment-reaction-text">{commentsCount}</p>
                    </div>
                    <div onClick={openTipModal} className="post-comment-reaction">
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
                    <ProfilePicture url={user.getProfilePicture()} hasStory={false} marginLeft="0px" marginRight="10px" zIndex={"1"}/>
                    <div className='post-comment-box-row'>
                      <TextareaAutosize
                        className="post-comment-input"
                        placeholder="Post your reply"
                        ref={textareaRef}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </div>
                    <div onClick={makeComment} className={comment === "" ? "post-comment-reply-button-inactive" : "post-comment-reply-button-active"}>
                      <p className="post-comment-reply-button-text">Reply</p>
                    </div>
                  </div>
                  <div>
                    {postComments.sort((a, b) => b.getCreationDate() - a.getCreationDate()).map((comment, index) => (
                      <PostCommentItem
                        key={index}
                        index={index}
                        comment={postComments[index]}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {!isMobile && <SecondarySideBar/>}
            </div>
            <ToastContainer/>
        </div>
    );
}

export default PostComment;