import React from "react"; 
import Box from "@mui/material/Box"; 
import Drawer from "@mui/material/Drawer"; 
import Button from "@mui/material/Button"; 
import './Drawer.css';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import { useEffect } from "react";

function MyDrawer({toggle, close}) { 

    const [state, setState] = React.useState({
        left: false,
    });

    //useEffect(() => {toggleDrawer(toggle)}, []);
    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            left: toggle,
        }));
    }, [toggle]);

	const toggleDrawer = (anchor, open) => (event) => { 
		if ( 
			event.type === "keydown" && 
			(event.key === "Tab" || event.key === "Shift") 
		) { 
			return; 
		} 

		setState({ ...state, left: open }); 
	}; 

    const closeDrawer = () => {
        close();
        setState({ ...state, left: false });
    };

	const itemsList = () => ( 
		<Box 
			sx={{ 
				width: 300, 
				backgroundColor: "#ffffff", 
				height: '100%'
			}} 
			role="drawer"
			onClick={closeDrawer}
			onKeyDown={toggleDrawer(false)} 
		> 
			<div className="drawer-container">
                <div className="drawer-title">
                    <img alt="logo" src="/images/justfans_black_red.png"/>
                    <img className="drawer-settings-icon" alt="Settings" src="/images/settings-pink.png"/>
                </div>
                <ProfilePicture marginLeft={'20px'} marginTop={'10px'} marginBottom={'10px'}/>
                <div>
                    <span className="drawer-display-name">
                        Sheriff Oladejo
                        <img src="/images/verifiied.png" alt="Super user" className="drawer-verified"  />
                    </span>
                    <div className="drawer-username">@deen</div>
                </div>
                <div className="drawer-subscribers-container" style={{marginBottom:'20px', marginTop:'-10px'}}>
                    <div className="drawer-username">20k</div>
                    <div className="drawer-subscribers-title">Subscribers</div>
                </div>
                <div className="drawer-item">
                    <img src="/images/profile.png" alt="Profile" className="drawer-item-image"/>
                    <div className="drawer-username">Profile</div>
                </div>
                <div className="drawer-item">
                    <img src="/images/dashboard.png" alt="Dashborad" className="drawer-item-image"/>
                    <div className="drawer-username">Dashboard</div>
                </div>
                <div className="drawer-item">
                    <img src="/images/settings.png" alt="Settings" className="drawer-item-image"/>
                    <div className="drawer-username">Settings</div>
                </div>
                <div className="drawer-divider"></div>
                <div className="drawer-item">
                    <img src="/images/tandc.png" alt="T and C" className="drawer-item-image"/>
                    <div className="drawer-username">Terms of service</div>
                    <img src="/images/right-chevron.png" alt="right" className="drawer-item-chevron"/>
                </div>
                <div className="drawer-divider2"></div>
                <div className="drawer-item">
                    <img src="/images/policy.png" alt="Policy" className="drawer-item-image"/>
                    <div className="drawer-username">Privacy policy</div>
                    <img src="/images/right-chevron.png" alt="right" className="drawer-item-chevron"/>
                </div>
                <div className="drawer-divider2"></div>
                <div className="drawer-item">
                    <img src="/images/support.png" alt="Support" className="drawer-item-image"/>
                    <div className="drawer-username">Contact support</div>
                    <img src="/images/right-chevron.png" alt="right" className="drawer-item-chevron"/>
                </div>
            </div>
		</Box> 
	); 

	return ( 
		<div onClick={closeDrawer}> 
			<center> 
            <React.Fragment> 
                <Drawer 
                    anchor="left"
                    open={state.left}
                    onClose={toggleDrawer(false)}
                > 
                    {itemsList()} 
                </Drawer> 
            </React.Fragment> 
			</center> 
		</div> 
	); 
} 

export default MyDrawer;
