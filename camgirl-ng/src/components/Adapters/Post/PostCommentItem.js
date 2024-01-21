import './PostCommentItem.css';
import ProfilePicture from '../../ProfilePicture/ProfilePicture';
import { useState, useEffect } from 'react';
import React from 'react';
import { calculateTimeAgo, formatNumber, getAppUser } from '../../../utils/Utils';
import AppUser from '../../../models/AppUser';
import DbHelper from '../../../utils/DbHelper';
import ReplyCommentModal from '../../Modals/ReplyCommentModal/ReplyCommentModal';

function PostCommentItem ({ comment, from, cb }) {

    const [owner, setOwner] = useState(new AppUser());
    const [user, setUser] = useState(new AppUser());
    const [likesCount, setLikesCount] = useState('');

    const [childCommentsCount, setChildCommentsCount] = useState(0);
    const [replyText, setReplyText] = useState('Reply');

    const [childComments, setChildComments] = useState([]);

    const [viewReplies, setViewReplies] = useState(false);

    const [showHover, setShowHover] = useState(false);

    const [loading, setLoading] = useState(false);

    const [showReplyModal, setShowReplyModal] = useState(false);

    const [likedByUser, setLikedByUser] = useState(false);

    let dbHelper = new DbHelper();

    const closeReplyModal = () => {
      console.log("closing modal");
      setShowReplyModal(false);
      document.body.style.overflow = "";
    };

    const showMoreReplies = async () => {
      console.log(viewReplies);
      if (from === 'commentmodal') {
        if (!viewReplies) {
          setViewReplies(true);
          let l = await dbHelper.getCommentsByPostID(comment.getId());
          setChildComments(l);
        }
        else if (viewReplies) {
          setViewReplies(false);
        }
      }
    }
  
    const openReplyModal =  async () => {
      if (from === 'postcomment') {
        setShowReplyModal(true);
        document.body.style.overflow = "hidden";
      }
      else if (from === 'commentmodal') {
        cb(owner.getUserName(), comment.getId());
      }
    };

    const callback = (likedByUser, likeCount, commentCount) => {
      setLikedByUser(likedByUser);
      setLikesCount(likeCount);
      setChildCommentsCount(commentCount);
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
        setLoading(true);
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
        setLoading(false);
      }
      getUser();
    },[user]);

    useEffect(() => {
      const getChildComments = async () => {
        let childComments = await dbHelper.getCommentCountByPostID(comment.getId());
        setChildCommentsCount(childComments);
        if (childComments === 0) {
          setReplyText('Reply');
        }
        else {
          if (viewReplies) {
            setReplyText(`Hide replies(${childComments})`)
          }
          else {
            setReplyText(`View replies(${childComments})`)
          }

        }
      }

      getChildComments();
    }, [viewReplies]);


    return (
      <div className='post-comment-item-container'>
        <ReplyCommentModal
          isOpen={showReplyModal} 
          onClose={closeReplyModal} 
          callback={callback}
          comment={comment}
          owner={owner}
          user={user} />
        <div className="post-comment-user-info">
          <ProfilePicture url={owner.getProfilePicture()} marginLeft='0px' zIndex={"0"}/>
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
              {from === 'postcomment' && <p className="post-comment-reply" onClick={openReplyModal}>{replyText}</p>}
              {from === 'commentmodal' && <p className="post-comment-reply" onClick={openReplyModal}>Reply</p>}
          </div>
          <div  className="post-comment-like-container">
            <img src="/images/more.png" alt="More" />
          </div>
        </div>
        {(childCommentsCount !== 0 && from === 'commentmodal') &&
          <div className='view-reply-div'>
            <div className='view-reply-divider'/>
            <p className="post-comment-reply" onClick={showMoreReplies}>{replyText}</p>
          </div>
        }
        {viewReplies && (<div className='reply-comment-modal-child-comment'>
          {childComments.sort((a, b) => b.getCreationDate() - a.getCreationDate()).map((comment, index) => (
            <PostCommentItem
              key={index}
              comment={childComments[index]}
              from="commentmodal"
              cb={cb}
            />
          ))}
        </div>)}
      </div>
  );
}

export default PostCommentItem;