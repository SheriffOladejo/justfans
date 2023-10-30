create table justfans_user (
    id integer primary key auto_increment,
    user_id varchar(200),
    username varchar(200),
    email varchar(400),
    phone_number varchar(200),
    password varchar(50),
    firstname varchar(20),
    lastname varchar(20),
    dob varchar(20),
    country varchar(20),
    location varchar(50),
    verification_doc text,
    docs_verified varchar(10),
    bio text,
    date_joined varchar(20),
    last_updated varchar(20),
    profile_picture text,
    cover_picture text,
    subscribers integer,
    connections integer,
    subscription_price float,
    currency_symbol varchar(2),
    currency varchar(4),
    creator_mode varchar(10),
    verified varchar(10),
    live_mode varchar(10),
    profile_setup varchar(10),
);