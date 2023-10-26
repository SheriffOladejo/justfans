import SuggestionCarousel from '../SecondarySideBar/Carousel/SuggestionCarousel';
import LiveCarousel from '../SecondarySideBar/Carousel/LiveCarousel';
import './SecondarySideBar.css';

function SecondarySideBar ({marginTop}) {
    return (
        <div className="secondary-sidebar">
            <div className="suggestion-container" style={{ marginTop:`${marginTop}` }}>
                <SuggestionCarousel/>
            </div>
            <div className="live-container">
                <LiveCarousel/>
            </div>
            <div className="secondary-sidebar-contact-info" >
                <div className="secondary-sidebar-contact-info-row">
                    <div className="secondary-sidebar-contact-info-circle"/>
                    <p className="secondary-sidebar-contact-info-text">Contact us</p>
                </div>
                <div className="secondary-sidebar-contact-info-row">
                    <div className="secondary-sidebar-contact-info-circle"/>
                    <p className="secondary-sidebar-contact-info-text">Terms of service</p>
                </div>
                <div className="secondary-sidebar-contact-info-row">
                    <div className="secondary-sidebar-contact-info-circle"/>
                    <p className="secondary-sidebar-contact-info-text">Privacy</p>
                </div>
            </div>
        </div>
    );
}

export default SecondarySideBar;