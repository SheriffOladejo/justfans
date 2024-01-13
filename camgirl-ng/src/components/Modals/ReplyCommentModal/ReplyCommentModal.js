import './ReplyCommentModal.css';
import ProfilePicture from '../../ProfilePicture/ProfilePicture';
import { useEffect, useState } from 'react';
import { formatNumber, calculateTimeAgo } from '../../../utils/Utils';
import TextareaAutosize from 'react-textarea-autosize';
import { useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import Foco from 'react-foco';

function ReplyCommentModal (
    { isOpen, onClose, comment, owner }
) {

    const [likesCount, setLikesCount] = useState('');

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const [commentText, setCommentText] = useState('');

    const textareaRef = useRef(null);

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


    const makeComment = async () => {

    }

    useEffect(() => {
        const getLikeData = async () => {
          
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
        getLikeData();
    },[]);





    if (!isOpen) {
        return null;
    }

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
                    <p className="reply-comment-modal-item-caption">{comment.getComment()}</p>
                    <div className="post-comment-item-reaction-container">
                        <div className="post-comment-item-reaction">
                            <div className="post-comment-like-container">
                            <img className="post-comment-like" src="/images/like.png" alt="Like"/>
                            </div>
                            <p className="post-likes">{likesCount}</p>
                            <p className="post-comment-reply" onClick={onClose}>Close</p>
                        </div>
                        <div  className="post-comment-like-container">
                        <img src="/images/more.png" alt="More" />
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
        </div>

    );
}

export default ReplyCommentModal;