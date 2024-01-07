class PostCommentModel {
    
    constructor (id, user_id, comment, creation_date, hidden, parent_id, likes) {
        this.id = id;
        this.user_id = user_id;
        this.comment = comment;
        this.creation_date = creation_date;
        this.hidden = hidden;
        this.parent_id = parent_id;
        this.likes = likes;
    }

    getId() {
        return this.id;
    }

    getUserId() {
        return this.user_id;
    }

    getComment() {
        return this.comment;
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
    setId(id) {
        this.id = id;
    }

    setUserId(user_id) {
        this.user_id = user_id;
    }

    setComment(comment) {
        this.comment = comment;
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




