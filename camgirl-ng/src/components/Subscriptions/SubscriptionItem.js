import './SubscriptionItem.css';
import ProfilePicture from '../ProfilePicture/ProfilePicture';

function SubscriptionItem () {
    return (
        <div>
            <div className='subscriptionitem-column-names-container'>
                <div className='subscriptionitem-user-column'>
                    <div className="subscriptionitem-profile">
                        <ProfilePicture marginLeft="0px" zIndex={"1"}/>
                        <div>
                            <span className="subscriptionitem-profile-display-name">
                            Sheriff Oladejo
                            <img src="/images/verifiied.png" alt="Super user" className="subscriptionitem-profile-verified"  />
                            </span>
                            <div className="subscriptionitem-profile-username">@BadNdBoujee</div>
                        </div>
                    </div>
                </div>
                <div className='subscriptionitem-package-column'>
                    <p>Premium</p>
                </div>
                <div className='subscriptionitem-renewal-column'>
                    <p>05/09/2023</p>
                </div>
                <div className='subscriptionitem-tips-column'>
                    <p>$500</p>
                </div>
                <div className='subscriptionitem-status-column'>
                    <div className='subscriptionitem-status'>
                        <div className='subscriptionitem-status-circle-active'></div>
                        <p className='subscriptionitem-status-active'>Active</p>
                    </div>
                </div>
            </div>
            <div className='subscriptionitem-divider'></div>
        </div>
    );
}

export default SubscriptionItem;