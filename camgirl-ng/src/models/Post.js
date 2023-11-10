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

    // Getter methods
    get id() {
        return this.id;
    }

    get post_id() {
        return this.post_id;
    }

    get user_id() {
        return this.user_id;
    }

    get caption() {
        return this.caption;
    }

    get post_link() {
        return this.post_link;
    }

    get post_link_title() {
        return this.post_link_title;
    }

    get post_link_image() {
        return this.post_link_image;
    }

    get attachment_file() {
        return this.attachment_file;
    }

    get attachment_file_name() {
        return this.attachment_file_name;
    }

    get attachment_type() {
        return this.attachment_type;
    }

    get post_share() {
        return this.post_share;
    }

    get post_privacy() {
        return this.post_privacy;
    }

    get post_type() {
        return this.post_type;
    }

    get creation_date() {
        return this.creation_date;
    }

    get comments_privacy() {
        return this.comments_privacy;
    }

    get comments() {
        return this.comments;
    }

    get reactions() {
        return this.reactions;
    }

    get likes() {
        return this.likes;
    }

    get tips() {
        return this.tips;
    }

    // Setter methods
    set id(value) {
        this.id = value;
    }

    set post_id(value) {
        this.post_id = value;
    }

    set user_id(value) {
        this.user_id = value;
    }

    set caption(value) {
        this.caption = value;
    }

    set post_link(value) {
        this.post_link = value;
    }

    set post_link_title(value) {
        this.post_link_title = value;
    }

    set post_link_image(value) {
        this.post_link_image = value;
    }

    set attachment_file(value) {
        this.attachment_file = value;
    }

    set attachment_file_name(value) {
        this.attachment_file_name = value;
    }

    set attachment_type(value) {
        this.attachment_type = value;
    }

    set post_share(value) {
        this.post_share = value;
    }

    set post_privacy(value) {
        this.post_privacy = value;
    }

    set post_type(value) {
        this.post_type = value;
    }

    set creation_date(value) {
        this.creation_date = value;
    }

    set comments_privacy(value) {
        this.comments_privacy = value;
    }

    set comments(value) {
        this.comments = value;
    }

    set reactions(value) {
        this.reactions = value;
    }

    set likes(value) {
        this.likes = value;
    }

    set tips(value) {
        this.tips = value;
    }
}
