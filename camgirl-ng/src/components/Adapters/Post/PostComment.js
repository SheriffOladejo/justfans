import './PostComment.css';
import ProfilePicture from '../../ProfilePicture/ProfilePicture';

function PostCommentItem () {
    return (
        <div className="post-comment-item-container">
          <div className="post-comment-user-info">
            <ProfilePicture marginLeft='0px' zIndex={"1"}/>
            <div className="post-comment-user-details">
              <div className="post-comment-name-username">
                <p className="post-comment-display-name">Sheriff</p>
                <img src="/images/verifiied.png" alt="Super user" className="post-comment-verified"  />
                <p className="post-comment-username">@deen</p>
              </div>
              <p className="post-comment-post-time">2hr ago</p>
            </div>
          </div>
          <p className="post-comment-item-caption">Wow she is so lovely️ and loveli sdmks skmdksmd ksmd ksmd sksmdks sdsdssddsd dfsndjsndjs ndjsdjsdsjdn sjdnjsn dsnd snd snds</p>
          <div className="post-comment-item-reaction-container">
            <div className="post-comment-item-reaction">
                <div className="post-comment-like-container">
                  <img className="post-comment-like" src="/images/like.png" alt="Like"/>
                </div>
                <p className="post-likes">120k</p>
            </div>
            <div  className="post-comment-like-container">
              <img src="/images/more.png" alt="More" />
            </div>
          </div>
        </div>
    );
}

export default PostCommentItem;