import Cookies from 'js-cookie';
import DbHelper from './DbHelper';

function isMobile () {
    if (window.innerWidth <= 600) {
        return true;
    }
    return false;
}

function isTablet () {
    if (window.innerWidth <= 1024) {
        return true;
    }
    return false;
}

function isDesktop() {
    if (window.innerWidth > 1024) {
        return true;
    }
    return false;
}

function isValidEmail(email) {
    // Regular expression for a basic email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
    return emailPattern.test(email);
}

function stringToUint8Array(str) {
    const encoder = new TextEncoder();
    return encoder.encode(str);
}

function isUserSignedIn () {
    const username = Cookies.get('username');
    const email = Cookies.get('email');
    if (username === null && email === null) {
        console.log("user cookie has expired");
        alert("user cookie has expired");
    }
    return {
        "email": email,
        "username": username
    };
}

async function getAppUser() {
    let dbHelper = new DbHelper();
    const signinData = isUserSignedIn();
    
    const username = signinData["username"];
    const email = signinData["email"];
    var user = null;
    if (email === null || email === undefined) {
      user = await dbHelper.getAppUserByUsername(username);
    }
    else {
      user = await dbHelper.getAppUserByEmail(email);
    }

    return user;
}

async function sha256(message) {
    const buffer = await crypto.subtle.digest("SHA-256", message);
    const array = Array.from(new Uint8Array(buffer));
    return array.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

function scrollToTop (window) {
    window.scrollTo({
        top: 0,
        behavior: 'smooth', 
    });
}

function calculateTimeAgo (timestamp) {
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - timestamp;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let result = '';

    if (days > 0) {
        result = `${days}${days === 1 ? ' day' : ' days'} ago`;
    } else if (hours > 0) {
        result = `${hours}${hours === 1 ? 'hr' : 'hrs'} ago`;
    } else if (minutes > 0) {
        result = `${minutes}${minutes === 1 ? 'min' : 'min'} ago`;
    } else {
        result = `${seconds}${seconds === 1 ? 's' : 's'} ago`;
    }

    return result;
}
  

export {
    calculateTimeAgo,
    isValidEmail,
    stringToUint8Array,
    sha256,
    isUserSignedIn,
    isTablet,
    isMobile,
    isDesktop,
    getAppUser,
    scrollToTop,
};