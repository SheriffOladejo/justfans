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



function BottomNav () {
    return (
      <BottomNavigation
          className='bottom-nav-container'
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon active={'false'} />} />
          <BottomNavigationAction label="Explore" icon={<ExploreIcon />} />
          <BottomNavigationAction label="Notifications" icon={<NotificiationIcon />} />
          <BottomNavigationAction label="Messages" icon={<MessageIcon />} />
          
        </BottomNavigation>
    );
}

export default BottomNav;