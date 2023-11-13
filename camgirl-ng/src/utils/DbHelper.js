import Post from '../models/Post';
import Constants from '../utils/Constants';
import axios from 'axios';
import AppUser from '../models/AppUser';

class DbHelper {
    constructor(){}

    async deletePost (post) {
        const data = {
            "post_id": post.getPostId()
        };
        try {
            const response = await axios.post(`${Constants.BASE_API_URL}/deletePost`, data);
            return response;
        }
        catch (error) {
            console.error("An error occurred: " + error);
        }
    }

    async updatePost (post) {
            const data = {
                "post_id": post.getPostId(),
                "user_id": post.getUserId(),
                "caption": post.getCaption(),
                "attachment_file": post.getAttachmentFile(),
                "comments_privacy": post.getCommentsPrivacy(),
                "comments": post.getComments(),
                "attachment_file_name": post.getAttachmentFileName(),
                "attachment_type": post.getAttachmentType(),
                "post_privacy": post.getPostPrivacy(),
                "post_type": post.getPostType(),
                "creation_date": post.getCreationDate(),
                "reactions": post.getReactions(),
                "likes": post.getLikes(),
                "tips": post.getTips(),
            };
            try {
                const response = await axios.post(`${Constants.BASE_API_URL}/updatePost`, data);
                return response;
            }
            catch (error) {
                console.error("An error occurred: " + error);
            }
    }

    async createPost (post) {
        const data = {
            "user_id": post.getUserId(),
            "caption": post.getCaption(),
            "attachment_file": post.getAttachmentFile(),
            "comments_privacy": post.getCommentsPrivacy(),
            "comments": post.getComments(),
            "attachment_file_name": post.getAttachmentFileName(),
            "attachment_type": post.getAttachmentType(),
            "post_privacy": post.getPostPrivacy(),
            "post_type": post.getPostType(),
            "creation_date": post.getCreationDate(),
            "reactions": post.getReactions(),
            "likes": post.getLikes(),
            "tips": post.getTips(),
        };
        try {
            const response = await axios.post(`${Constants.BASE_API_URL}/createPost`, data);
            return response;
        }
        catch (error) {
            console.error("An error occurred: " + error);
        }  
    }

    async getPostsByUserID (user_id) {
        const list = [];
        try {
            const data = {"user_id": user_id};
            const response = await axios.get(`${Constants.BASE_API_URL}/getPostsByUserID/${user_id}`, {params: data});
            for (let i = 0; i <= response.data.length; i++) {
                const id = response.data[i]["id"];
                const post_id = response.data[i]["post_id"];
                const post_user_id = response.data[i]["post_user_id"];
                const caption = response.data[i]["caption"];
                const post_link = response.data[i]["post_link"];
                const post_link_title = response.data[i]["post_link_title"];
                const post_link_image = response.data[i]["post_link_image"];
                const attachment_file = response.data[i]["attachment_file"];
                const attachment_file_name = response.data[i]["attachment_file_name"];
                const attachment_type = response.data[i]["attachment_type"];
                const post_share = response.data[i]["post_share"];
                const post_privacy = response.data[i]["post_privacy"];
                const post_type = response.data[i]["post_type"];
                const creation_date = response.data[i]["creation_date"];
                const comments_privacy = response.data[i]["comments_privacy"];
                const comments = response.data[i]["comments"];
                const reactions = response.data[i]["reactions"];
                const likes = response.data[i]["likes"];
                
                const post = new Post(
                    id,
                    post_id,
                    post_user_id,
                    caption,
                    post_link, 
                    post_link_title, 
                    post_link_image, 
                    attachment_file,
                    attachment_file_name, 
                    attachment_type, 
                    post_share, 
                    post_privacy, 
                    post_type, 
                    creation_date,
                    comments_privacy, 
                    comments,
                    reactions, 
                    likes
                );
                list.push(post);
            }
            
        }
        catch(error) {
            console.log("getPostsByUserID error: " + error);
        }
        return list;
    }

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

    async getAppUserByUsername (username) {
        try{
            const data = {"username": username};
            const response = await axios.get(`${Constants.BASE_API_URL}/getAppUserByUsername`, {params: data});
            if (response.data.length !== 0) {
                const id = response.data[0]["id"];
                const user_id = response.data[0]["user_id"];
                const username = response.data[0]["username"];
                const email = response.data[0]["email"];
                const phone_number = response.data[0]["phone_number"];
                const password = response.data[0]["password"];
                const firstname = response.data[0]["firstname"];
                const lastname = response.data[0]["lastname"];
                const dob = response.data[0]["dob"];
                const country = response.data[0]["country"];
                const location = response.data[0]["location"];
                const verification_doc = response.data[0]["verification_doc"];
                const docs_verified = response.data[0]["docs_verified"];
                const bio = response.data[0]["bio"];
                const date_joined = response.data[0]["date_joined"];
                const last_updated = response.data[0]["last_updated"];
                const profile_picture = response.data[0]["profile_picture"];
                const cover_picture = response.data[0]["cover_picture"];
                const subscribers = response.data[0]["subscribers"];
                const connections = response.data[0]["connections"];
                const subscription_price = response.data[0]["subscription_price"];
                const currency_symbol = response.data[0]["currency_symbol"];
                const currency = response.data[0]["currency"];
                const creator_mode = response.data[0]["creator_mode"];
                const verified = response.data[0]["verified"];
                const live_mode = response.data[0]["live_mode"];
                const profile_setup = response.data[0]["profile_setup"];
                const account_type = response.data[0]["account_type"];
                const creator_mode_desc_dismissed = response.data[0]["creator_mode_desc_dismissed"];
    
                const user = new AppUser(
                    id,
                    user_id,
                    username,
                    email,
                    phone_number, 
                    password, 
                    firstname, 
                    lastname,
                    dob, 
                    country, 
                    location, 
                    verification_doc, 
                    docs_verified, 
                    bio, 
                    date_joined,
                    last_updated, 
                    profile_picture, 
                    cover_picture, 
                    subscribers, 
                    connections,
                    subscription_price, 
                    currency_symbol, 
                    currency, 
                    creator_mode, 
                    verified,
                    live_mode, 
                    profile_setup, 
                    account_type,
                    creator_mode_desc_dismissed
                );
                return user;
            }
        }
        catch(error) {
            console.log("getAppUserByUserName error: " + error);
        }
        
        return null;
    }

    async getAppUserByEmail (email) {
        try{
            const user = new AppUser();
            const data = {"email": email};
            const response = await axios.get(`${Constants.BASE_API_URL}/getAppUserByEmail`, {params: data});
            if (response.data.length !== 0) {
                const id = response.data[0]["id"];
                const user_id = response.data[0]["user_id"];
                const username = response.data[0]["username"];
                const email = response.data[0]["email"];
                const phone_number = response.data[0]["phone_number"];
                const password = response.data[0]["password"];
                const firstname = response.data[0]["firstname"];
                const lastname = response.data[0]["lastname"];
                const dob = response.data[0]["dob"];
                const country = response.data[0]["country"];
                const location = response.data[0]["location"];
                const verification_doc = response.data[0]["verification_doc"];
                const docs_verified = response.data[0]["docs_verified"];
                const bio = response.data[0]["bio"];
                const date_joined = response.data[0]["date_joined"];
                const last_updated = response.data[0]["last_updated"];
                const profile_picture = response.data[0]["profile_picture"];
                const cover_picture = response.data[0]["cover_picture"];
                const subscribers = response.data[0]["subscribers"];
                const connections = response.data[0]["connections"];
                const subscription_price = response.data[0]["subscription_price"];
                const currency_symbol = response.data[0]["currency_symbol"];
                const currency = response.data[0]["currency"];
                const creator_mode = response.data[0]["creator_mode"];
                const verified = response.data[0]["verified"];
                const live_mode = response.data[0]["live_mode"];
                const profile_setup = response.data[0]["profile_setup"];
                const account_type = response.data[0]["account_type"];
                const creator_mode_desc_dismissed = response.data[0]["creator_mode_desc_dismissed"];

                const user = new AppUser(
                    id,
                    user_id,
                    username,
                    email,
                    phone_number, 
                    password, 
                    firstname, 
                    lastname,
                    dob, 
                    country, 
                    location, 
                    verification_doc, 
                    docs_verified, 
                    bio, 
                    date_joined,
                    last_updated, 
                    profile_picture, 
                    cover_picture, 
                    subscribers, 
                    connections,
                    subscription_price, 
                    currency_symbol, 
                    currency, 
                    creator_mode, 
                    verified,
                    live_mode, 
                    profile_setup, 
                    account_type,
                    creator_mode_desc_dismissed
                );
                return user;
            }
        }
        catch(error) {
            console.log("getAppUserByEmail error: " + error);
        }
        return null;
    }
    
    async updateUser (user) {
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
            "creator_mode_desc_dismissed": user.getCreatorModeDescDismissed() === undefined ? "" : user.getCreatorModeDescDismissed(),
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
