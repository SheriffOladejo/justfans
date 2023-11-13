

import Cookies from 'js-cookie';

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
    return {
        "email": email,
        "username": username
    };
}

async function sha256(message) {
    const buffer = await crypto.subtle.digest("SHA-256", message);
    const array = Array.from(new Uint8Array(buffer));
    return array.map(byte => byte.toString(16).padStart(2, '0')).join('');
}
  

export {
    isValidEmail,
    stringToUint8Array,
    sha256,
    isUserSignedIn,
};