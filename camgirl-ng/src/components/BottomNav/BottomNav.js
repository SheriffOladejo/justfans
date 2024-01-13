import './BottomNav.css';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';  
import Home from '../Home/Home';
import Explore from '../Explore/Explore';
import Subscriptions from '../Subscriptions/Subscriptions';
import Messages from '../Messages/Messages';
import HomeIcon from './Icons/HomeIcon';
import ExploreIcon from './Icons/ExploreIcon';
import NotificiationIcon from './Icons/NotificationIcon';
import MessageIcon from './Icons/MessageIcon';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function BottomNav () {

    const [value, setValue] = useState(-1);
    const navigate = useNavigate();


    return (
      <BottomNavigation
          className='bottom-nav-container'
          onChange={(event, newValue) => {
            console.log("bottomnav clicked: " + newValue);
            if (newValue === 0 && value !== 0) {
              setValue(newValue);
              navigate('/');
            }
            else if (newValue === 1 && value !== 1) {
              setValue(newValue);
              navigate('/explore');
            }
          }}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon active={'false'} />} />
          <BottomNavigationAction label="Explore" icon={<ExploreIcon />} />
          <BottomNavigationAction label="Notifications" icon={<NotificiationIcon />} />
          <BottomNavigationAction label="Messages" icon={<MessageIcon />} />
          
        </BottomNavigation>
    );
}

export default BottomNav;