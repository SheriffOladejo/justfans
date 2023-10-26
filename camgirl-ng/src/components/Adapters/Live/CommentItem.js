import './CommentItem.css';
import ProfilePicture from '../../ProfilePicture/ProfilePicture';

function CommentItem ({user_id, storyCount, username, viewerCount, comment}) {
    const hasStory = `${storyCount > 0 ? 'underlay' : ''}`;
    return (
        <div className="comment-container">
            <div className={`comment-profile-picture`}>
                <div className={hasStory} />
                <img src="/images/profile-picture.png" alt="Profile" />
            </div>

            <p className="live-comment-username">{username}</p>
            <img src="/images/verifiied.png" alt="Super user" className="comment-user-verified"  />
            <div className='live-comment-container'>
                <p className="live-comment-comment">{comment}</p>
                <img src='/images/more.png'/>
            </div>
        </div>
    );
}

export default CommentItem;