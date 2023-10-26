import './NotificationSettings.css';
import { useState } from 'react';

function NotificationSettings () {

    const [isTagging, setIsTagging] = useState(false);

    const toggleTagging = () => {
        setIsTagging(!isTagging);
    };

    return (
        <div className='notifications-main-container'>
            <p className='notifications-title'>Notification settings</p>
            <div className='notifications-item-row'>
                <div className='notifications-item-column'>
                    <p className='notifications-item-title'>Login Notifications</p>
                    <p className='notifications-item-desc'>Get notified every time login occurs on this account.</p>
                </div>
                <div className={`notifications-switch ${isTagging ? 'on' : 'off'}`} onClick={toggleTagging}>
                    <div className="notifications-slider"></div>
                </div>
            </div>
            <div className='notifications-item-row'>
                <div className='notifications-item-column'>
                    <p className='notifications-item-title'>New Post Notifications</p>
                    <p className='notifications-item-desc'>Get notified twice a day with new posts from followed creators.</p>
                </div>
                <div className={`notifications-switch ${isTagging ? 'on' : 'off'}`} onClick={toggleTagging}>
                    <div className="notifications-slider"></div>
                </div>
            </div>
            <div className='notifications-item-row'>
                <div className='notifications-item-column'>
                    <p className='notifications-item-title'>Live Notifications</p>
                    <p className='notifications-item-desc'>Get notified each time a person you follow is live.</p>
                </div>
                <div className={`notifications-switch ${isTagging ? 'on' : 'off'}`} onClick={toggleTagging}>
                    <div className="notifications-slider"></div>
                </div>
            </div>
            <div className='notifications-item-row'>
                <div className='notifications-item-column'>
                    <p className='notifications-item-title'>New Message Notifications</p>
                    <p className='notifications-item-desc'>Get notified when you receive a new message.</p>
                </div>
                <div className={`notifications-switch ${isTagging ? 'on' : 'off'}`} onClick={toggleTagging}>
                    <div className="notifications-slider"></div>
                </div>
            </div>
        </div>
    );
}

export default NotificationSettings;
