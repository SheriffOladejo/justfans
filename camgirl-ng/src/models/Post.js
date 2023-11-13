class Post {
    constructor(
        id, post_id, user_id, caption, post_link, post_link_title, post_link_image,
        attachment_file, attachment_file_name, attachment_type, post_share, post_privacy, 
        post_type, creation_date, comments_privacy, comments, reactions, likes, tips 
    ) {
        this.id = id;
        this.post_id = post_id;
        this.user_id = user_id;
        this.caption = caption;
        this.post_link = post_link;
        this.post_link_title = post_link_title;
        this.post_link_image = post_link_image;
        this.attachment_file = attachment_file;
        this.attachment_file_name = attachment_file_name;
        this.attachment_type = attachment_type;
        this.post_share = post_share;
        this.post_privacy = post_privacy;
        this.post_type = post_type;
        this.creation_date = creation_date;
        this.comments_privacy = comments_privacy;
        this.comments = comments;
        this.reactions = reactions;
        this.likes = likes;
        this.tips = tips;
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

    getPostLink() {
        return this.post_link;
    }

    getPostLinkTitle() {
        return this.post_link_title;
    }

    getPostLinkImage() {
        return this.post_link_image;
    }

    getAttachmentFile() {
        return this.attachment_file;
    }

    getAttachmentFileName() {
        return this.attachment_file_name;
    }

    getAttachmentType() {
        return this.attachment_type;
    }

    getPostShare() {
        return this.post_share;
    }

    getPostPrivacy() {
        return this.post_privacy;
    }

    getPostType() {
        return this.post_type;
    }

    getCreationDate() {
        return this.creation_date;
    }

    getCommentsPrivacy() {
        return this.comments_privacy;
    }

    getComments() {
        return this.comments;
    }

    getReactions() {
        return this.reactions;
    }

    getLikes() {
        return this.likes;
    }

    getTips() {
        return this.tips;
    }

    // Setter methods with camelCase naming
    setId(value) {
        this.id = value;
    }

    setUserId(value) {
        this.user_id = value;
    }

    setCaption(value) {
        this.caption = value;
    }

    setPostLink(value) {
        this.post_link = value;
    }

    setPostLinkTitle(value) {
        this.post_link_title = value;
    }

    setPostLinkImage(value) {
        this.post_link_image = value;
    }

    setAttachmentFile(value) {
        this.attachment_file = value;
    }

    setAttachmentFileName(value) {
        this.attachment_file_name = value;
    }

    setAttachmentType(value) {
        this.attachment_type = value;
    }

    setPostShare(value) {
        this.post_share = value;
    }

    setPostPrivacy(value) {
        this.post_privacy = value;
    }

    setPostType(value) {
        this.post_type = value;
    }

    setCreationDate(value) {
        this.creation_date = value;
    }

    setCommentsPrivacy(value) {
        this.comments_privacy = value;
    }

    setComments(value) {
        this.comments = value;
    }

    setReactions(value) {
        this.reactions = value;
    }

    setLikes(value) {
        this.likes = value;
    }

    setTips(value) {
        this.tips = value;
    }
}

export default Post; 