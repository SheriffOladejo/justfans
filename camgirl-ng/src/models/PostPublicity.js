class PostPublicity {
    
    constructor(id,image,title,desc) {
        this.id = id;
        this.image = image;
        this.title = title;
        this.desc = desc;
    }


    getId() {
        return this.id;
    }
    
    
    getImage() {
        return this.image;
    }
    
    getTitle() {
        return this.title;
    }
    
    getDesc() {
        return this.desc;
    }
    
    setId(id) {
        this.id = id;
    }
    
    
    setImage(image) {
        this.image = image;
    }
    
    setTitle(title) {
        this.title = title;
    }
    
    setDesc(desc) {
        this.desc = desc;
    }
    
}

export default PostPublicity;