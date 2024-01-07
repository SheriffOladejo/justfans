class AppUser {
    constructor(
      id, user_id, username, email, phone_number, password, firstname, lastname,
      dob, country, location, verification_doc, docs_verified, bio, date_joined,
      last_updated, profile_picture, cover_picture, subscribers, connections,
      subscription_price, currency_symbol, currency, creator_mode, verified,
      live_mode, profile_setup, account_type, creator_mode_desc_dismissed
    ) {
      this.id = id;
      this.user_id = user_id;
      this.username = username;
      this.email = email;
      this.phone_number = phone_number;
      this.password = password;
      this.firstname = firstname;
      this.lastname = lastname;
      this.dob = dob;
      this.country = country;
      this.location = location;
      this.verification_doc = verification_doc;
      this.docs_verified = docs_verified;
      this.bio = bio;
      this.date_joined = date_joined;
      this.last_updated = last_updated;
      this.profile_picture = profile_picture;
      this.cover_picture = cover_picture;
      this.subscribers = subscribers;
      this.connections = connections;
      this.subscription_price = subscription_price;
      this.currency_symbol = currency_symbol;
      this.currency = currency;
      this.creator_mode = creator_mode;
      this.verified = verified;
      this.live_mode = live_mode;
      this.profile_setup = profile_setup;
      this.account_type = account_type;
      this.creator_mode_desc_dismissed = creator_mode_desc_dismissed;
    }

    toString() {
      return `AppUser { 
        id: ${this.id}, 
        user_id: ${this.user_id}, 
        username: ${this.username}, 
        email: ${this.email}, 
        // ... include other properties ...
        profile_setup: ${this.profile_setup} 
      }`;
    }

    getCreatorModeDescDismissed() {
      return this.creator_mode_desc_dismissed;
    }

    setCreatorModeDescDismissed(creator_mode_desc_dismissed) {
      this.creator_mode_desc_dismissed = creator_mode_desc_dismissed;
    }

    getAccountType() {
      return this.account_type;
    }

    getId() {
      return this.id;
    }
  
    getUserId() {
      return this.user_id;
    }
  
    getUserName() {
      return this.username;
    }
  
    getEmail() {
      return this.email;
    }
  
    getPhoneNumber() {
      return this.phone_number;
    }
  
    getPassword() {
      return this.password;
    }
  
    getFirstName() {
      return this.firstname;
    }
  
    getLastName() {
      return this.lastname;
    }
  
    getDOB() {
      return this.dob;
    }
  
    getCountry() {
      return this.country;
    }
  
    getLocation() {
      return this.location;
    }
  
    getVerificationDoc() {
      return this.verification_doc;
    }
  
    getDocsVerified() {
      return this.docs_verified;
    }
  
    getBio() {
      return this.bio;
    }
  
    getDateJoined() {
      return this.date_joined;
    }
  
    getLastUpdated() {
      return this.last_updated;
    }
  
    getProfilePicture() {
      return this.profile_picture;
    }
  
    getCoverPicture() {
      return this.cover_picture;
    }
  
    getSubscribers() {
      return this.subscribers;
    }
  
    getConnections() {
      return this.connections;
    }
  
    getSubscriptionPrice() {
      return this.subscription_price;
    }
  
    getCurrencySymbol() {
      return this.currency_symbol;
    }
  
    getCurrency() {
      return this.currency;
    }
  
    getCreatorMode() {
      return this.creator_mode;
    }
  
    getVerified() {
      return this.verified;
    }
  
    getLiveMode() {
      return this.live_mode;
    }
  
    getProfileSetup() {
      return this.profile_setup;
    }

    setAccountType(account_type) {
      this.account_type = account_type;
    }
  
    setId(newId) {
      this.id = newId;
    }
  
    setUserId(newUser_id) {
      this.user_id = newUser_id;
    }
  
    setUserName(newUsername) {
      this.username = newUsername;
    }
  
    setEmail(newEmail) {
      this.email = newEmail;
    }
  
    setPhoneNumber(newPhoneNumber) {
      this.phone_number = newPhoneNumber;
    }
  
    setPassword(newPassword) {
      this.password = newPassword;
    }
  
    setFirstName(newFirstName) {
      this.firstname = newFirstName;
    }
  
    setLastName(newLastName) {
      this.lastname = newLastName;
    }
  
    setDOB(newDOB) {
      this.dob = newDOB;
    }
  
    setCountry(newCountry) {
      this.country = newCountry;
    }
  
    setLocation(newLocation) {
      this.location = newLocation;
    }
  
    setVerificationDoc(newVerificationDoc) {
      this.verification_doc = newVerificationDoc;
    }
  
    setDocsVerified(newDocsVerified) {
      this.docs_verified = newDocsVerified;
    }
  
    setBio(newBio) {
      this.bio = newBio;
    }
  
    setDateJoined(newDateJoined) {
      this.date_joined = newDateJoined;
    }
  
    setLastUpdated(newLastUpdated) {
      this.last_updated = newLastUpdated;
    }
  
    setProfilePicture(newProfilePicture) {
      this.profile_picture = newProfilePicture;
    }
  
    setCoverPicture(newCoverPicture) {
      this.cover_picture = newCoverPicture;
    }
  
    setSubscribers(newSubscribers) {
      this.subscribers = newSubscribers;
    }
  
    setConnections(newConnections) {
      this.connections = newConnections;
    }
  
    setSubscriptionPrice(newSubscriptionPrice) {
      this.subscription_price = newSubscriptionPrice;
    }
  
    setCurrencySymbol(newCurrencySymbol) {
      this.currency_symbol = newCurrencySymbol;
    }
  
    setCurrency(newCurrency) {
      this.currency = newCurrency;
    }
  
    setCreatorMode(newCreatorMode) {
      this.creator_mode = newCreatorMode;
    }
  
    setVerified(newVerified) {
      this.verified = newVerified;
    }
  
    setLiveMode(newLiveMode) {
      this.live_mode = newLiveMode;
    }
  
    setProfileSetup(newProfileSetup) {
      this.profile_setup = newProfileSetup;
    }
  }
  
  export default AppUser; 
  
  