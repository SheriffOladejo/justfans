class PostCommentModel {
    
    constructor (id, user_id, caption, creation_date, hidden, parent_id, likes, reactions, user_ids, privacy) {
        this.id = id;
        this.user_id = user_id;
        this.user_ids = user_ids;
        this.reactions = reactions;
        this.caption = caption;
        this.creation_date = creation_date;
        this.hidden = hidden;
        this.parent_id = parent_id;
        this.likes = likes;
        this.privacy = privacy;
    }

    getPrivacy () {
        return this.privacy;
    }

    getReactions () {
        return this.reactions;
    }

    getUserIds () {
        return this.user_ids;
    }

    getId() {
        return this.id;
    }

    getUserId() {
        return this.user_id;
    }

    getCaption() {
        return this.caption;
    }

    getCreationDate() {
        return this.creation_date;
    }

    isHidden() {
        return this.hidden;
    }

    getParentId() {
        return this.parent_id;
    }

    getLikes() {
        return this.likes;
    }

    // Setter methods

    setPrivacy (privacy) {
        this.privacy = privacy;
    }

    setUserIds(user_ids) {
        this.user_ids = user_ids;
    }

    setReactions(reactions) {
        this.reactions = reactions;
    }

    setId(id) {
        this.id = id;
    }

    setUserId(user_id) {
        this.user_id = user_id;
    }

    setCaption(caption) {
        this.caption = caption;
    }

    setCreationDate(creation_date) {
        this.creation_date = creation_date;
    }

    setHidden(hidden) {
        this.hidden = hidden;
    }

    setParentId(parent_id) {
        this.parent_id = parent_id;
    }

    setLikes(likes) {
        this.likes = likes;
    }

}

export default PostCommentModel;




