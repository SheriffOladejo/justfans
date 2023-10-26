import './ChatItem.css';
import 'react-chat-elements/dist/main.css'
import ProfilePicture from '../ProfilePicture/ProfilePicture';

function ChatItem () {
    return (
        <div>
            <div className='chat-item-container'>
                <div className='chat-item-container1'>
                    <div className='chat-item-container-height-small'>
                        <ProfilePicture marginLeft="15px" hasStory={true} zIndex={"1"}/>
                    </div>
                    <div className='chat-item-container-height-small'>
                        <div className='chat-item-user-details'>
                            <span className="chat-item-display-name">Sheriff Olad
                                <img src="/images/verifiied.png" alt="Super user" className="chat-item-user-verified"/>
                            </span>
                            <p className='chat-item-username'>@caseyii2</p>
                        </div>
                        <p className='chat-item-message'>What are you up to today?What are you up to today?What are you up to today?...</p>
                    </div>
                </div>
                <div className='chat-item-container-height-small unread-container'>
                    <p className='chat-item-time'>8:07 PM</p>
                    <div className='chat-item-unread-container'>
                        <p className='chat-item-unread'>25</p>
                    </div>
                    
                </div>
            </div>
            <div className='chat-item-divider'></div>
        </div>
    );
}

export default ChatItem;