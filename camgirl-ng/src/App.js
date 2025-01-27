import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SelectGif from './components/SelectGif/SelectGif';
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
import CreatePost from './components/CreatePost/CreatePost';
import { initializeApp } from 'firebase/app';
import Constants from './utils/Constants';


function App() {
  
  const firebaseApp = initializeApp(Constants.FIREBASE_CONFIG);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MainPage/>} />
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
        <Route path='/selectGif' element={<SelectGif/>} />
        <Route path='/create-post' element={<CreatePost/>} />
      </Routes>
    </Router>
  );
}

export default App;