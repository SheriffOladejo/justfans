CREATE TABLE justfans_db.justfans_post (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    post_id INTEGER NOT NULL,
    user_id VARCHAR(200) NOT NULL,
    caption TEXT,
    post_link TEXT,
    post_link_title TEXT,
    post_link_image TEXT,
    attachment_file TEXT,
    attachment_file_name TEXT,
    attachment_type VARCHAR(100),
    post_share TEXT,
    post_privacy INTEGER,
    post_type TEXT,
    creation_date INTEGER,
    comments_privacy INTEGER,
    comments TEXT,
    reactions TEXT,
    likes TEXT,
    tips TEXT,
    FOREIGN KEY (post_id) REFERENCES justfans_db.justfans_user(id)
);

CREATE TABLE justfans_db.justfans_user (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(200) DEFAULT '',
    username VARCHAR(200) DEFAULT '',
    email VARCHAR(400) DEFAULT '',
    phone_number VARCHAR(200) DEFAULT '',
    password VARCHAR(50) DEFAULT '',
    firstname VARCHAR(20) DEFAULT '',
    lastname VARCHAR(20) DEFAULT '',
    dob VARCHAR(200) DEFAULT '',
    country VARCHAR(20) DEFAULT '',
    location VARCHAR(50) DEFAULT '',
    verification_doc VARCHAR(500) DEFAULT '',
    docs_verified VARCHAR(10) DEFAULT '',
    bio VARCHAR(2000) DEFAULT '',
    date_joined VARCHAR(20) DEFAULT '',
    last_updated VARCHAR(20) DEFAULT '',
    profile_picture VARCHAR(500) DEFAULT '',
    cover_picture VARCHAR(500) DEFAULT '',
    subscribers INTEGER DEFAULT 0,
    connections INTEGER DEFAULT 0,
    subscription_price FLOAT DEFAULT 0.0,
    currency_symbol VARCHAR(2) DEFAULT '',
    currency VARCHAR(4) DEFAULT '',
    creator_mode VARCHAR(10) DEFAULT '',
    verified VARCHAR(10) DEFAULT '',
    live_mode VARCHAR(10) DEFAULT '',
    profile_setup VARCHAR(10) DEFAULT '',
    account_type VARCHAR(20) DEFAULT '',
    creator_mode_desc_dismissed VARCHAR(20) DEFAULT '',
);
