import './Subscriptions.css';
import Navbar from '../Navbar/Navbar';
import SecondarySideBar from '../SecondarySideBar/SecondarySideBar';
import SideBar from '../SideBar/SideBar';
import SubscriptionItem from './SubscriptionItem';

function Subscriptions () {
    const subData = [1,2,3,4,5,6,7,8,9,0, 11,12,1,1,1,1,1,1,1];
    return (
        <div style={{ backgroundColor:'#EBEBEB' }}>
            <Navbar />
            <div className='subscriptions-page'>
                <SideBar pageIndex={5}/>
                <div className='subscriptions-main-container'>
                    <div className='subscriptions-title-container'>
                        <p className="subscriptions-title">My subscriptions</p>
                    </div>
                    <div className='subscriptions-column-names-container'>
                        <div className='subscriptions-user-column'>
                            <p>User</p>
                        </div>
                        <div className='subscriptions-package-column'>
                            <p>Subscription package</p>
                        </div>
                        <div className='subscriptions-renewal-column'>
                            <p>Next renewal</p>
                        </div>
                        <div className='subscriptions-tips-column'>
                            <p>Tips</p>
                        </div>
                        <div className='subscriptions-status-column'>
                            <p>Status</p>
                        </div>
                    </div>
                    <div className='subscriptions-list'>
                        {subData.map((item, index) => (
                        <SubscriptionItem
                            key={index}
                        />
                        ))}
                    </div>
                </div>
                <SecondarySideBar/>
            </div>
        </div>
    );
}

export default Subscriptions;