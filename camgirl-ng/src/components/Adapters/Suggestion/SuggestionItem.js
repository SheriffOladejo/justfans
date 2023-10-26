import './SuggestionItem.css';
import ProfilePicture from '../../ProfilePicture/ProfilePicture';

function SuggestionItem() {
  return (
    <div className="suggestion-item-container">
      <div className="suggestion-item">
        <ProfilePicture marginTop = "0px" style={{ zIndex: 2 }}/>
        <div className="suggestion-item-user-info">
          <span className="suggestion-display-name">
            Case cert
            <img
              src="/images/verifiied.png"
              alt="Super user"
              className="suggestion-item-user-verified"
              style={{
                marginLeft: '5px',
                verticalAlign: 'middle',
                width: '15px',
                height: '15px',
              }}
            />
          </span>
          <p className="suggestion-username">@deen</p>
        </div>
        <p style={{ marginBottom: '0px', zIndex: '2' }} className="subscription">Free</p>
      </div>
      <div className="suggestion-overlay"></div>
    </div>
  );
}

export default SuggestionItem;
