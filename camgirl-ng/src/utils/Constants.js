const BASE_API_URL = "https://www.camgirl.ng";
const GOOGLE_CLIENT_ID = "731652107541-1a39e12v4vcl8kjth31ejijop0utp7ad.apps.googleusercontent.com";
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDSO_rYRNWdvXBXacvlRz-i4rO4hoWnsmE",
  authDomain: "justfans-7b8d7.firebaseapp.com",
  projectId: "justfans-7b8d7",
  storageBucket: "justfans-7b8d7.appspot.com",
  messagingSenderId: "1037613388819",
  appId: "1:1037613388819:web:bf5bd5f49b3b34f8e71be6",
  measurementId: "G-BGLWK9CLBT"
};
const GIPHY_API_KEY = "ZTwrsVxPy6dmwBCIZyUKLTlbAm8dXwpm";

const PUBLICITY_OPTIONS = [
  {title: "Everyone", image: "/images/globe.svg", desc: "Anyone on or off Camgirl"},
  {title: "Friends", image: "/images/friends.svg", desc: "Your friends on Camgirl"}, 
  {title: "Friends except", image: "/images/friends-except.svg", desc: "Only specific friends"}, 
  {title: "Only me", image: "/images/padlock.svg", desc: ""}
];

const ATTACHMENT_GIF = "gif";
const ATTACHMENT_IMAGE = "image";
const ATTACHMENT_VIDEO = "video";

module.exports = {
  BASE_API_URL,
  GOOGLE_CLIENT_ID,
  FIREBASE_CONFIG,
  GIPHY_API_KEY,
  PUBLICITY_OPTIONS,
  ATTACHMENT_GIF,
  ATTACHMENT_IMAGE,
  ATTACHMENT_VIDEO,
};