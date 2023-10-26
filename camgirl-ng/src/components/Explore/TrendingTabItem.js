import './TrendingTabItem.css';

function TrendingTabItem ({trendName}) {
    return (
        <div className="explore-tab-item">
            <p>{trendName}</p>
        </div>
    );
}

export default TrendingTabItem;