import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Signup from './components/Signup/Signup';
import Splash from './components/Splash/Splash';
import ProfileSetup from './components/ProfileSetup/ProfileSetup';
import MainPage from './components/MainPage/MainPage';
import LiveVideo from './components/LiveVideo/LiveVideo';
import PostComment from './components/PostComment/PostComment';
import Explore from './components/Explore/Explore';
import Messages from './components/Messages/Messages';
import Subscriptions from './components/Subscriptions/Subscriptions';
import Dashboard from './components/Dashboard/Dashboard';
import Settings from './components/Settings/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Splash/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/profile-setup" element={<ProfileSetup/>} />
        <Route path="/main-page" element={<MainPage/>} />
        <Route path="/live-video" element={<LiveVideo/>} />
        <Route path="/post-comment" element={<PostComment/>} />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/messages" element={<Messages/>} />
        <Route path="/subscriptions" element={<Subscriptions/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/settings" element={<Settings/>} />
      </Routes>
    </Router>
  );
}

export default App;