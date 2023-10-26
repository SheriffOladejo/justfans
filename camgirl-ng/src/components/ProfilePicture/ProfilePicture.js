import './ProfilePicture.css';

function ProfilePicture ({ 
    url,
    username, 
    hasStory, 
    isOnline, 
    marginTop, 
    marginBottom, 
    marginLeft,
    zIndex }) {
    var boxShadow = "0 0 0 1px #ffffff";

    if (hasStory) {
        boxShadow = "0 0 0 1px #f94f64";
    }
    return (
        <div className="profile-picture" style={{ 
            boxShadow: `${boxShadow}`, 
            marginTop: `${marginTop}`, 
            marginBottom: `${marginBottom}`,  
            marginLeft: `${marginLeft}`,
            zIndex: `${zIndex}`,
            }}>
          <div className={`${isOnline ? 'online-indicator' : ''}`}></div>
          <img src="/images/profile-picture.png" alt="Profile" />
        </div>
    );
}

export default ProfilePicture;
