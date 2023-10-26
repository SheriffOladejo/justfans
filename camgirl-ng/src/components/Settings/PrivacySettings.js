import './PrivacySettings.css';
import { useState } from 'react';

function PrivacySettings () {

    const [isTagging, setIsTagging] = useState(false);

    const toggleTagging = () => {
        setIsTagging(!isTagging);
    };

    return (
        <div className='privacy-main-container'>
            <p className='privacy-title'>Privacy and safety</p>
            <div className='privacy-item-row'>
                <div className='privacy-item-column'>
                    <p className='privacy-item-title'>Audience and tagging</p>
                    <p className='privacy-item-desc'>Allow others to mention me in their posts and comments</p>
                </div>
                <div className={`privacy-switch ${isTagging ? 'on' : 'off'}`} onClick={toggleTagging}>
                    <div className="privacy-slider"></div>
                </div>
            </div>
            <div className='privacy-item-row'>
                <div className='privacy-item-column'>
                    <p className='privacy-item-title'>Show activity status</p>
                    <p className='privacy-item-desc'>Let others know when you're online</p>
                </div>
                <div className={`privacy-switch ${isTagging ? 'on' : 'off'}`} onClick={toggleTagging}>
                    <div className="privacy-slider"></div>
                </div>
            </div>
            <div className='privacy-item-row'>
                <div className='privacy-item-column'>
                    <p className='privacy-item-title'>Direct messages</p>
                    <p className='privacy-item-desc'>Manage who can message you directly</p>
                </div>
                <img
                    className='privacy-item-arrow'
                    src='/images/chevron-right-black.png'
                    alt='Click'
                />
            </div>
            <div className='privacy-item-row'>
                <div className='privacy-item-column'>
                    <p className='privacy-item-title'>Mute & Block</p>
                    <p className='privacy-item-desc'>Manage the accounts, words, and notifications that you’ve muted or blocked.</p>
                </div>
                <img
                    className='privacy-item-arrow'
                    src='/images/chevron-right-black.png'
                    alt='Click'
                />
            </div>
            <div className='privacy-divider'></div>
            <div className='privacy-item-row'>
                <div className='privacy-item-row2'>
                    <img
                        className='privacy-item-icon'
                        src='/images/privacy-policy.png'
                        alt='privacy'
                    />
                    <p className='privacy-item-desc'>Privacy policy</p>
                </div>
                <img
                    className='privacy-item-arrow'
                    src='/images/chevron-right-black.png'
                    alt='Click'
                />
            </div>
            <div className='privacy-divider'></div>
            <div className='privacy-item-row'>
                <div className='privacy-item-row2'>
                    <img
                        className='privacy-item-icon'
                        src='/images/contact-support.png'
                        alt='support'
                    />
                    <p className='privacy-item-desc'>Contact support</p>
                </div>
                <img
                    className='privacy-item-arrow'
                    src='/images/chevron-right-black.png'
                    alt='Click'
                />
            </div>
        </div>
    );
}

export default PrivacySettings;
