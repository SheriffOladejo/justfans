import Post from '../models/Post';
import Constants from '../utils/Constants';
import axios from 'axios';
import AppUser from '../models/AppUser';
import PostCommentModel from '../models/PostCommentModel';
import { getDataFromLocalStorage } from './Utils';

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

    async createComment (comment) {
        const data = {
            "user_id": comment.getUserId(),
            "caption": comment.getCaption(),
            "creation_date": comment.getCreationDate(),
            "hidden": comment.isHidden(),
            "parent_id": comment.getParentId(),
            "likes": comment.getLikes(),
            "reactions": comment.getReactions(),
            "privacy": comment.getPrivacy(),
            "user_ids": comment.getUserIds()
        };
        try {
            const response = await axios.post(`${Constants.BASE_API_URL}/createComment`, data);
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

    async updateComment (comment) {
        const data = {
            "id": comment.getId(),
            "user_id": comment.getUserId(),
            "user_ids": comment.getUserIds(),
            "creation_date": comment.getCreationDate(),
            "parent_id": comment.getParentId(),
            "hidden": comment.isHidden(),
            "caption": comment.getCaption(),
            "reactions": comment.getReactions(),
            "likes": comment.getLikes()
        };
        try {
            const response = await axios.post(`${Constants.BASE_API_URL}/updateComment`, data);
            return response;
        }
        catch (error) {
            console.error("An error occurred: " + error);
        }
    }

    async getChildComments (comment_id) {
        const list = [];
        try {
            const data = {"parent_id": comment_id};
            const response = await axios.get(`${Constants.BASE_API_URL}/getChildComments`, {params: data});
            response.data.sort((a, b) => b.creation_date - a.creation_date);
            for (let i = 0; i < response.data.length; i++) {
                const id = response.data[i]["id"];
                const user_id = response.data[i]["user_id"];
                const user_ids = response.data[i]["user_ids"];
                const creation_date = response.data[i]["creation_date"];
                const parent_id = response.data[i]["parent_id"];
                const hidden = response.data[i]["hidden"];
                const caption = response.data[i]["caption"];
                const reactions = response.data[i]["reactions"];
                const likes = response.data[i]["likes"];
                
                const comment = new PostCommentModel(
                    id,
                    user_id,
                    caption,
                    creation_date,
                    hidden,
                    parent_id,
                    likes,
                    reactions,
                    user_ids
                );
                list.push(comment);
            }
        }
        catch (error) {
            console.log("getChildComments error: " + error);
        }
        return list;
    }

    async getCommentsByPostID (post_id) {
        const list = [];
        try {
            const data = {"post_id": post_id};
            const response = await axios.get(`${Constants.BASE_API_URL}/getCommentsByPostID`, {params: data});
            response.data.sort((a, b) => b.creation_date - a.creation_date);
            for (let i = 0; i < response.data.length; i++) {
                const id = response.data[i]["id"];
                const user_id = response.data[i]["user_id"];
                const user_ids = response.data[i]["user_ids"];
                const creation_date = response.data[i]["creation_date"];
                const parent_id = response.data[i]["parent_id"];
                const hidden = response.data[i]["hidden"];
                const caption = response.data[i]["caption"];
                const reactions = response.data[i]["reactions"];
                const likes = response.data[i]["likes"];
                
                const comment = new PostCommentModel(
                    id,
                    user_id,
                    caption,
                    creation_date,
                    hidden,
                    parent_id,
                    likes,
                    reactions,
                    user_ids
                );
                list.push(comment);
            }
            
        }
        catch (error) {
            console.log("getCommentsByPostID error: " + error);
        }
        return list;
    }

    async getCommentCountByPostID (post_id) {
        const data = {"post_id": `${post_id}`};
        const response = await axios.get(`${Constants.BASE_API_URL}/getCommentCountByPostID`, {params: data});
        let count = response.data[0]["count"];
        return count;
    }

    async getPostsByUserID (user_id) {
        const list = [];
        try {
            const data = {"user_id": user_id};
            var response = null;
            if (getDataFromLocalStorage("posts") !== null) {
                response = JSON.parse(getDataFromLocalStorage("posts"));
                response.sort((a, b) => b.creation_date - a.creation_date);
                for (let i = 0; i < response.length; i++) {
                    const id = response[i]["id"];
                    const user_id = response[i]["user_id"];
                    const caption = response[i]["caption"];
                    const post_link = response[i]["post_link"];
                    const post_link_title = response[i]["post_link_title"];
                    const post_link_image = response[i]["post_link_image"];
                    const attachment_file = response[i]["attachment_file"];
                    const attachment_file_name = response[i]["attachment_file_name"];
                    const attachment_type = response[i]["attachment_type"];
                    const post_share = response[i]["post_share"];
                    const post_privacy = response[i]["post_privacy"];
                    const post_type = response[i]["post_type"];
                    const creation_date = response[i]["creation_date"];
                    const comments_privacy = response[i]["comments_privacy"];
                    const comments = response[i]["comments"];
                    const reactions = response[i]["reactions"];
                    const likes = response[i]["likes"];
                    
                    const post = new Post(
                        id,
                        user_id,
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
            else {
                response = await axios.get(`${Constants.BASE_API_URL}/getPostsByUserID`, {params: data});
                response.data.sort((a, b) => b.creation_date - a.creation_date);
                for (let i = 0; i < response.data.length; i++) {
                    const id = response.data[i]["id"];
                    const user_id = response.data[i]["user_id"];
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
                        user_id,
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
        }
        catch(error) {
            console.log("getPostsByUserID error: " + error);
        }
        return list;
    }

    async getPostByID (post_id) {
        var post = new Post();
        try {
            const data = {"post_id": post_id};
            const response = await axios.get(`${Constants.BASE_API_URL}/getPostByID`, {params: data});
            for (let i = 0; i < response.data.length; i++) {
                const id = response.data[i]["id"];
                const user_id = response.data[i]["user_id"];
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
                
                post = new Post(
                    id,
                    user_id,
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
            }
            
        }
        catch(error) {
            console.log("getPostByID error: " + error);
        }
        return post;
    }

    async updatePost (post) {
        const data = {
            "id": post.getId(),
            "user_id": post.getUserId(),
            "caption": post.getCaption(),
            "post_link": post.getPostLink(),
            "post_link_title": post.getPostLinkTitle(),
            "post_link_image": post.getPostLinkImage(),
            "attachment_file": post.getAttachmentFile(),
            "attachment_file_name": post.getAttachmentFileName(),
            "attachment_type": post.getAttachmentType(),
            "post_share": post.getPostShare(),
            "post_privacy": post.getPostPrivacy(),
            "post_type": post.getPostType(),
            "creation_date": post.getCreationDate(),
            "comments_privacy": post.getCommentsPrivacy(),
            "comments": post.getComments(),
            "reactions": post.getReactions(),
            "likes": post.getLikes()
          };
        try {
            const response = await axios.post(`${Constants.BASE_API_URL}/updatePost`, data);
            return response;
        }
        catch (error) {
            console.error("An error occurred: " + error);
        }
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

    async getAppUserByID (user_id) {
        try{
            const data = {"user_id": user_id};
            const response = await axios.get(`${Constants.BASE_API_URL}/getAppUserByID`, {params: data});
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
            console.log("getAppUserByID error: " + error);
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
            "currency": user.getCurrencyy() === undefined ? "" : user.getCurrency(),
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
