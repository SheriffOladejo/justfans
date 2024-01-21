import './ReplyCommentModal.css';
import ProfilePicture from '../../ProfilePicture/ProfilePicture';
import { useEffect, useState } from 'react';
import { formatNumber, calculateTimeAgo } from '../../../utils/Utils';
import TextareaAutosize from 'react-textarea-autosize';
import { useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import Foco from 'react-foco';
import PostCommentModel from '../../../models/PostCommentModel';
import DbHelper from '../../../utils/DbHelper';
import PostCommentItem from '../../Adapters/Post/PostCommentItem';

function ReplyCommentModal (
    { isOpen, onClose, comment, owner, user, callback }
) {

    let dbHelper = new DbHelper();

    const [likesCount, setLikesCount] = useState('');
    const [likedByUser, setLikedByUser] = useState(false);


    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const [commentText, setCommentText] = useState('');
    const [commentId, setCommentId] = useState('');

    const [childComments, setChildComments] = useState([]);

    const textareaRef = useRef(null);
    
    useEffect(() => {
      setLikedByUser(false);
      setLikesCount('');
      setCommentText("");
    }, [isOpen]);

    useEffect(() => {
        const getLikeData = () => {
          
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
        getLikeData();
    }, [isOpen]);

    useEffect(() => {
      const getChildComments = async () => {
        let childComments = await dbHelper.getCommentsByPostID(comment.getId());
        setChildComments(childComments);
      }

      getChildComments();
    }, [isOpen]);

    const handleClose = () => {
      setCommentText('');
      setLikedByUser(false);
      setShowEmojiPicker(false);
      setLikesCount('');
      onClose();
    }

    const handleEmojiSelect = (emoji) => {
        const { selectionStart, selectionEnd } = textareaRef.current;
    
        const newText =
        commentText.substring(0, selectionStart) +
        emoji["emoji"] +
        commentText.substring(selectionEnd);
    
        setCommentText(newText);
    
        const newCursorPosition = selectionStart + emoji["emoji"].length;
        textareaRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
    
        setShowEmojiPicker(false);
    };


    const makeComment = async (event) => {
      
      event.preventDefault();
      let user_ids = JSON.stringify([]);
      let privacy = -1;
      let post_comment = new PostCommentModel(
        -1,
        user.getUserId(),
        commentText,
        Date.now(),
        "false",
        comment.getId(),
        "",
        "",
        user_ids,
        privacy
      );

      const words = commentText.split(/\s+/);

      if (words.length > 0 && words[0].startsWith('@')) {
        post_comment.setParentId(commentId);
        await dbHelper.createComment(post_comment);
        callback(likedByUser, likesCount, childComments.length + 1);
      }
      else {
        await dbHelper.createComment(post_comment);
        callback(likedByUser, likesCount, childComments.length);
      }
  
      
      onClose();
    
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
            callback(!likedByUser, formatNumber(likes));
          }
          else {
            setLikesCount('');
            callback(!likedByUser, '');
          }
        }
    }

    const cb = (username, comment_id) => {
      setCommentText(`@${username} `);
      setCommentId(comment_id);
    }

    if (!isOpen) {
        return null;
    }

    isOpen = !isOpen;

    return (
        <div className='reply-comment-modal-main'>
            <div className='reply-comment-modal-child'>
                <div className="reply-comment-modal-item-container">
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
                    <p className="reply-comment-modal-item-caption">{comment.getCaption()}</p>
                    <div className="post-comment-item-reaction-container">
                        <div className="post-comment-item-reaction">
                            <div className="post-comment-like-container" onClick={likeComment}>
                              <img  className="post-comment-like" src={likedByUser ? "/images/like_red.png" : "/images/like.png"} alt="Like" />
                            </div>
                            <p className="post-likes">{likesCount}</p>
                            <p className="post-comment-reply" onClick={handleClose}>Close</p>
                        </div>
                        <div  className="post-comment-like-container">
                        <img src="/images/more.png" alt="More" />
                        </div>
                    </div>
                    
                </div>
                <div className='reply-comment-modal-child-comment-container'>
                  <div className='reply-comment-modal-child-comment'>
                    {childComments.sort((a, b) => b.getCreationDate() - a.getCreationDate()).map((comment, index) => (
                      <PostCommentItem
                        key={index}
                        comment={childComments[index]}
                        from="commentmodal"
                        cb={cb}
                      />
                    ))}
                  </div>
                </div>
                <div className="replymodal-comment-box">
                  <a href='#' onClick={() => setShowEmojiPicker((prev) => !prev)} style={{ paddingLeft: '0px' }}>
                      <img
                          src="/images/emoji.svg"
                          alt="Emoji"
                      />
                  </a>
                  <TextareaAutosize
                      className="reply-comment-modal-input"
                      placeholder="Add a comment"
                      ref={textareaRef}
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                  />
                  <a href='#' onClick={makeComment} style={{ paddingRight: '10px' }}>
                      <img
                          src="/images/send.png"
                          alt="Send"
                      />
                  </a>
                </div>
                {showEmojiPicker && (
                    <Foco
                    onClickOutside={() => setShowEmojiPicker(false)}>
                        <div className="reply-comment-modal-emoji-picker">
                            <EmojiPicker
                            onEmojiClick={handleEmojiSelect}
                            />
                        </div>
                    </Foco>
                )}
            </div>
        </div>

    );
}

export default ReplyCommentModal;
