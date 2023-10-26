import './TopCreatorItem.css';

function TopCreatorItem () {
    return (
        <div className='top-creator-container'>
            <img className='top-creator-image' src='/images/image 6.png'/>
            <div className='top-creator-details'>
                <div className='top-creator-details-row'>
                <span className="top-creator-display-name">Case cert
                <img src="/images/verifiied.png" alt="Super user" className="top-creator-user-verified"/></span>
                <p className="top-creator-subscription">Free</p>
                </div>
                <p className='top-creator-username'>@caseyii2</p>
            </div>
        </div>
    );
}

export default TopCreatorItem;