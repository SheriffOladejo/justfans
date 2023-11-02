import AppUser from '../models/AppUser';
import Constants from '../utils/Constants';
import axios from 'axios';

class DbHelper {
    constructor(){}

    async checkForUsername (username) {
        const data = {
          "username": username
        };
        try {
          const response = await axios.get(`${Constants.BASE_API_URL}/checkUsername`, {params: data});
          return response;
        }
        catch (error) {
          console.error("An error occurred: " + error);
        }
    }
    
    async checkForEmail (email) {
        const data = {
            "email": email
        };
        try {
            const response = await axios.get(`${Constants.BASE_API_URL}/checkEmail`, {params: data});
            return response;
        }
        catch (error) {
            console.error("An error occurred: " + error);
        }
    }
    
    async updateUser (user) {
        console.log(user.getUserId());
        const data = {
            "user_id": user.getUserId()  === undefined ? "" : user.getUserId(),
            "username": user.getUserName() === undefined ? "" : user.getUserName(),
            "firstname": user.getFirstName() === undefined ? "" : user.getFirstName(),
            "lastname": user.getLastName() === undefined ? "" : user.getLastName(),
            "password": user.getPassword() === undefined ? "" : user.getPassword(),
            "creator_mode": user.getCreatorMode() === undefined ? "" : user.getCreatorMode(),
            "phone_number": user.getPhoneNumber() === undefined ? "" : user.getPhoneNumber(),
            "country": user.getCountry() === undefined ? "" : user.getCountry(),
            "location": user.getLocation() === undefined ? "" : user.getLocation(),
            "verification_doc": user.getVerificationDoc() === undefined ? "" : user.getVerificationDoc(),
            "docs_verified": user.getDocsVerified() === undefined ? "" : user.getDocsVerified(),
            "bio": user.getBio() === undefined ? "" : user.getBio(),
            "profile_picture": user.getProfilePicture() === undefined ? "" : user.getProfilePicture(),
            "cover_picture": user.getCoverPicture() === undefined ? "" : user.getCoverPicture(),
            "subscribers": user.getSubscribers() === undefined ? 0 : user.getSubscribers(),
            "connections": user.getConnections() === undefined ? 0 : user.getConnections(),
            "subscription_price": user.getSubscriptionPrice() === undefined ? 0 : user.getSubscriptionPrice(),
            "currency_symbol": user.getCurrencySymbol() === undefined ? "" : user.getCurrencySymbol(),
            "verified": user.getVerified() === undefined ? "" : user.getVerified(),
            "live_mode": user.getLiveMode() === undefined ? "" : user.getLiveMode(),
            "profile_setup": user.getProfileSetup() === undefined ? "" : user.getProfileSetup(),
            "dob": user.getDOB() === undefined ? "" : user.getDOB(),
        };
        try {
            const response = await axios.post(`${Constants.BASE_API_URL}/updateUser`, data);
            return response;
        }
        catch (error) {
            console.error("An error occurred: " + error);
        }
        
    }
    

}


export default DbHelper;
