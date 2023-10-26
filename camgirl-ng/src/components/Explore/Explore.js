import './Explore.css';
import Navbar from '../Navbar/Navbar';
import SideBar from '../SideBar/SideBar';
import TrendingTabItem from './TrendingTabItem';
import LiveItem from '../Adapters/Live/LiveItem';
import TopCreatorItem from './TopCreatorItem';
import FloatingButton from '../../utils/FloatingButton/FloatingButton';

function Explore () {

    const trendData = [
        {"id": 1, "text": "#feet"},
        {"id": 2, "text": "#FYP"},
        {"id": 3, "text": "#Camgirl"},
        {"id": 4, "text": "#Ebony booty"},
        {"id": 5, "text": "#Ebony booty"},
        {"id": 6, "text": "#Ebony booty"},
        {"id": 7, "text": "#Ebony booty"},
        {"id": 8, "text": "#Ebony booty"},
        {"id": 9, "text": "#Ebony booty is dope as well as always"},
        {"id": 10, "text": "#Ebony booty is dope"},
    ];

    const liveCamData = [1,2,3,4,5,6,7,8,9];

    const topCreatorData = [1,2,3,4,5,6,7,8,9];

    return (
    <div style={{backgroundColor:'#EBEBEB'}}>
        <Navbar />
        <div className="explore-container">
            <SideBar pageIndex={2}/>
            <div className="explore-main-container">
                <form className="explore-first-container">
                    <div className="explore-search-container">
                        <input type="text" placeholder="Search posts, creators" className="explore-search-input" />
                        <img src="/images/search-black.png" alt="Search" className="explore-search-icon" />
                    </div>
                    <div className="explore-paid-selection">
                        <p>Free</p>
                        <img src="/images/chevron-down.png" alt="Filter" style={{ width: '10px', height: '10px', marginLeft: '5px' }} />
                    </div>
                </form>
                <div className="explore-trending-tab">
                    <h4 className="explore-trending-title">Trending</h4>
                    <div className="explore-trend-list">
                      {trendData.map((item) => (
                        <TrendingTabItem
                            key={item.id}
                            trendName={item.text}
                        />
                      ))}
                    </div>
                </div>
                <div className="explore-trending-tab">
                    <h4 className="explore-trending-title">Live Cam</h4>
                    <div className="explore-trend-list">
                      {liveCamData.map((item, index) => (
                        <LiveItem key={index} />
                      ))}
                    </div>
                </div>
                <div className="explore-trending-tab">
                    <h4 className="explore-trending-title">Top Creators</h4>
                    <div className="explore-top-creator-list">
                      {topCreatorData.map((item, index) => (
                        <TopCreatorItem key={index} />
                      ))}
                    </div>
                </div>
            </div>
        </div>
        <FloatingButton/>
    </div>

    );
}

export default Explore;