import Stories from '../Home/Stories/Stories';
import './Home.css';
import FeedItem from '../Home/Feed/FeedItem';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import { useState, useRef, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { ToastContainer, toast } from 'react-toastify';
import ReactPlayer from 'react-player';
import EmojiPicker from 'emoji-picker-react';
import Post  from '../../models/Post';
import AppUser from '../../models/AppUser';
import Navbar from '../ProfileSetup/Navbar';
import DbHelper from '../../utils/DbHelper';
import { getAppUser, isUserSignedIn } from '../../utils/Utils';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { FIREBASE_CONFIG, PUBLICITY_OPTIONS, ATTACHMENT_GIF, ATTACHMENT_IMAGE, ATTACHMENT_VIDEO } from '../../utils/Constants';
import { initializeApp } from 'firebase/app';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import SelectGif from '../SelectGif/SelectGif';
import BottomNav from '../BottomNav/BottomNav';
import PublicityOptions from './PublicityOptions/PublicityOptions';
import { scrollToTop } from '../../utils/Utils';

function Home () {

    const dbHelper = new DbHelper();

    const [loading, setLoading] = useState(false);
    const [postText, setPostText] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const textareaRef = useRef(null);

    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedGif, setSelectedGif] = useState(null);
    const [user, setUser] = useState(new AppUser());
    const [attachmentType, setAttachmentType] = useState('');
    const [attachmentFileName, setAttachmentFileName] = useState('');
    const [attachmentFile, setAttachmentFile] = useState('');

    const [posts, setPosts] = useState([]);

    const attachmentRef = useRef();
    const gifRef = useRef();

    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    const [selectedPublicity, setSelectedPublicity] = useState(PUBLICITY_OPTIONS[0].title);
    const [isPublicityDropdownOpen, setIsPublicityDropdownOpen] = useState(false);

    const [showGifs, setShowGifs] = useState(false);

    const togglePublicityDropdown = () => {
      setIsPublicityDropdownOpen(!isPublicityDropdownOpen);
    };

    const toggleShowGifs = () => {
      setShowGifs(!showGifs);
    }

    const handlePublicityOptionClick = (option) => {
      setSelectedPublicity(option);
      setIsPublicityDropdownOpen(false);
    };

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth <= 600) {
          setIsMobile(true);
          setIsDesktop(false);
          setIsTablet(false);
        } else if (window.innerWidth <= 1024) {
          setIsTablet(true);
          setIsMobile(false);
          setIsDesktop(false);
        }
        else {
          setIsDesktop(true);
          setIsMobile(false);
          setIsTablet(false);
        }
      };
  
      handleResize();
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
  
    }, []);


    const showFilterOptions = (event) => {
        event.preventDefault();
    }

    const uploadAttachment = async () => {
      if (attachmentFileName === '') {
        return;
      }
      setLoading(true);
      const firebaseApp = initializeApp(FIREBASE_CONFIG);
      const storage = getStorage(firebaseApp);
      var storageRef;
      var uploadTask;
      if (selectedGif !== null) {
        storageRef = ref(storage, `attachmentFiles/${selectedGif.name}`);
        uploadTask = uploadBytesResumable(storageRef, selectedGif);
      }
      else if (selectedImage !== null) {
        storageRef = ref(storage, `attachmentFiles/${selectedImage.name}`);
        uploadTask = uploadBytesResumable(storageRef, selectedImage);
      }
      else if (selectedVideo !== null) {
        storageRef = ref(storage, `attachmentFiles/${selectedVideo.name}`);
        uploadTask = uploadBytesResumable(storageRef, selectedVideo);
      }
      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% complete`);
          setLoading(false);
        },
        (error) => {
          setLoading(false);
          toast("Upload error");
          console.error('Upload error:', error);
        },
        () => {
          console.log('Upload successful!');
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setAttachmentFile(downloadURL);
            setLoading(false);
          });
        }
      );
    }

    const handleEmojiSelect = (emoji) => {
      const { selectionStart, selectionEnd } = textareaRef.current;
  
      const newText =
        postText.substring(0, selectionStart) +
        emoji["emoji"] +
        postText.substring(selectionEnd);
  
      setPostText(newText);
  
      const newCursorPosition = selectionStart + emoji["emoji"].length;
      textareaRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
  
      setShowEmojiPicker(false);
    };

    useEffect(() => {
      if (attachmentFile !== '') {
        createPost();
      }
    }, [attachmentFile]);

    useEffect(() => {
      const fetchUser = async () => {
        var _u = await getAppUser();
        setUser(_u);
      };
      fetchUser();
    }, []);

    useEffect(() => {
      const getPosts = async () => {
        const signinData = isUserSignedIn();
          
        const username = signinData["username"];
        const email = signinData["email"];


        var _u = await getAppUser();

        if (_u !== null) {
          let user_id = _u.user_id;
          let posts = await dbHelper.getPostsByUserID(user_id);
          setPosts(posts);
        }
        else {
        }
      }

      getPosts();

    }, []);

    const removeAttachment = () => {
      setSelectedVideo(null);
      setSelectedImage(null);
      setSelectedGif(null);
      setAttachmentType('');
      setAttachmentFile('');
      setAttachmentFileName('');

      if (attachmentRef.current) {
        attachmentRef.current.value = '';
      }
    
      if (gifRef.current) {
        gifRef.current.value = '';
      }
    }

    const handlePostAttachment = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        const fileType = selectedFile.type;
        
        const isImage = fileType.startsWith('image/');
        const isVideo = fileType.startsWith('video/');

        if (isImage) {
          setSelectedImage(selectedFile);
          setSelectedVideo(null);
          setSelectedGif(null);
          setAttachmentType(ATTACHMENT_IMAGE);
          setAttachmentFileName(selectedFile.name);
        } else if (isVideo) {
          setSelectedVideo(selectedFile);
          setSelectedImage(null);
          setSelectedGif(null);
          setAttachmentType(ATTACHMENT_VIDEO);
          setAttachmentFileName(selectedFile.name);
        } else {
          console.error('Invalid file type. Please select an image or a video.');
        }
      }
    }

    const handleGifAttachment = (selectedGif) => {
      setSelectedGif(selectedGif);
      setAttachmentFileName(ATTACHMENT_GIF);
      setAttachmentType(ATTACHMENT_GIF);
      setShowGifs(false);
    };
  

    const openFileChooser = () => {
      attachmentRef.current.click();
    };

    const openGifChooser = () => {
      gifRef.current.click();
    };

    const createPost = async () => {
      if (attachmentFile === '' && attachmentFileName !== '') {
        uploadAttachment();
      }
      else {
        setLoading(true);
        const post = new Post();
        post.setUserId(user.getUserId());
        post.setCaption(postText === null ? "" : postText);
        post.setAttachmentFile(attachmentFile);
        post.setAttachmentFileName(attachmentFileName);
        post.setAttachmentType(attachmentType);
        post.setPostPrivacy(null);
        post.setCreationDate(Date.now());
        post.setCommentsPrivacy(null);
        post.setLikes(null);
        post.setTips(null);
        dbHelper.createPost(post);
        setAttachmentFile('');
        setAttachmentFileName('');
        setAttachmentType('');
        setSelectedGif(null);
        setSelectedImage(null);
        setSelectedVideo(null);
        setPostText('');
        setLoading(false);
      }
    }

    const removeDialogs = async () => {
      if (showEmojiPicker) {
        setShowEmojiPicker(false);
      }
      if (showGifs) {
        setShowGifs(false);
      }
      if (isPublicityDropdownOpen) {
        setIsPublicityDropdownOpen(false);
      }
      
    }

    if (loading) {
      return (
        <div>
      <Navbar />
      <div className="dialog-container">
        <div className="profile-dialog">
          <div style={{ paddingTop:'100px', paddingBottom:'100px' }}><LoadingScreen/></div>
      
        </div>
      </div> 
    </div>
      );
    }

    const bottomNavHomeClicked = () => {
      
    }

    scrollToTop(window);

    if (isMobile) {
      return (
        <div className='home-container'>
          
          <div className='stories-container'>
            <Stories isMobile={true}/>
          </div>
          <div className='divider'></div>
          <div className='filter-posts'>
            <img src="/images/filter.png" alt="Filter" style={{ width: '16px', height: '16px' }} />
            <p style={{ fontSize: '13px', fontWeight: '400', fontFamily: 'Inter' }}>Filter posts:</p>
            <div className='filter-container'>
              <p style={{ fontSize: '13px', fontWeight: '400', fontFamily: 'Inter', marginLeft: '5px' }}>Free</p>
              <a href='#' onClick={showFilterOptions} style={{ paddingRight: '10px' }}>
                <img src="/images/chevron-down.png" alt="Filter" style={{ width: '10px', height: '10px', marginLeft: '5px' }} />
              </a>
            </div>
          </div>
          <div className='divider'></div>
          
          <div>
          {posts.map((item, index) => (
              <FeedItem
                key={index}
                post={item}
              />
            ))}
          </div>

          <ToastContainer/>

          <BottomNav/>

        </div>
      );
    }

    return (
        <div onClick={removeDialogs} className="home-container">
          <Stories />
          <div className="create-post-container">
              <div className="textfield-and-profile">
                  <div>
                    <ProfilePicture url={user.getProfilePicture()} marginTop="15px" zIndex={"1"}/>
                  </div>
                  
                  <div className='home-create-post'>
                    <div className="home-post-publicity" onClick={togglePublicityDropdown}>
                      <img className="home-post-publicity-icon" src="/images/globe.png" alt="Image" />
                      <p className="home-post-publicity-text">{selectedPublicity}</p>
                      <img className="home-post-publicity-icon-arrow" src="/images/chevron-down.png" alt="Image" />
                    </div>
                    {isPublicityDropdownOpen && (
                      <div className='publicity-dropdown-container'>
                        <p className='publicity-desc-title'>Who can see your post?</p>
                        <p className='publicity-desc'>Your post will show up in Feed, on your profile and in search results.<br/><br/>Your default audience is set to Public, but you can change the audience of this specific post.</p>
                        <div className="publicity-dropdown-list">
                          {PUBLICITY_OPTIONS.map((option) => 
                            <PublicityOptions title={option.title} desc={option.desc} image={option.image} handlePublicityOptionClick={handlePublicityOptionClick} />
                          )}
                        </div>
                        <div className="publicity-buttons-row">
                          <button className="publicity-cancel-button">
                            Cancel
                          </button>
                          <button className="publicity-done-button">
                            Done
                          </button>
                        </div>
                      </div>
                      )}
                    <TextareaAutosize
                      className="home-create-post-textfield"
                      placeholder="What's happening!?"
                      ref={textareaRef}
                      value={postText}
                      onChange={(e) => setPostText(e.target.value)}
                    />
                    {showEmojiPicker && (
                      <div className="home-emoji-picker">
                        <EmojiPicker
                          onEmojiClick={handleEmojiSelect}
                        />
                      </div>
                    )}

                    <div className="home-post-attachment-container">
                      
                      { (selectedGif || selectedImage) && 
                        <img className="home-post-attachment-media" 
                        src={selectedGif === null ? URL.createObjectURL(selectedImage) : selectedGif}/> 
                      }
                      { selectedVideo && 
                        <ReactPlayer
                          url={URL.createObjectURL(selectedVideo)}
                          controls={true}
                          width="100%"
                          max-height="auto"
                        /> 
                      }
                      { attachmentType !== '' &&
                        <div style={{ display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center' }}>
                          <div onClick={removeAttachment} className="home-post-attachment-close-container">
                            <img className="home-post-attachment-close" src="/images/close.png"/>
                          </div>
                          { (selectedImage || selectedVideo) && <div className="home-post-attachment-edit-container"><h4 className="home-post-attachment-edit">Edit</h4></div>}
                        </div>
                      }
                    </div>
                  </div>
              </div>
              <div style={{ 
                width: 'auto', 
                height: '0.08px', 
                backgroundColor: '#EBEBEB', 
                marginTop: '25px',
                marginLeft: '10px',
                marginRight: '10px' }}/>
              <div className="element-container">
                <div className="home-attachment-container">
                  <div className="element" onClick={() => setShowEmojiPicker((prev) => !prev)}>
                    <img src="/images/smile.png" alt="Emoji" />
                  </div>
                  <div className="element" onClick={openFileChooser}>
                    <img src="/images/image.png" alt="Image" />
                  </div>
                  <div className="element" onClick={toggleShowGifs}>
                    <img src="/images/gif.png" alt="Gif" />
                  </div>
                  <div className="element">
                    <img style={{ marginTop: '5px' }} src="/images/live.png" alt="Live Video" />
                  </div>
                </div>
                <button className="post-button" onClick={createPost} disabled={ !postText && !selectedImage && !selectedVideo && !selectedGif }>
                  Post
                </button>
                <input type="file" style={{ display: 'none' }} accept="image/gif" ref={gifRef} onChange={handleGifAttachment} />
              
                <input type="file" style={{ display: 'none' }} accept="image/jpeg, image/png, video/mp4" ref={attachmentRef} onChange={handlePostAttachment} />
              </div>
          </div>
          {showGifs && <SelectGif onSelect={handleGifAttachment} />}
          <div className='filter-posts'>
            <img src="/images/filter.png" alt="Filter" style={{ width: '16px', height: '16px' }} />
            <p style={{ fontSize: '13px', fontWeight: '400', fontFamily: 'Inter' }}>Filter posts:</p>
            <p style={{ fontSize: '13px', fontWeight: '400', fontFamily: 'Inter', marginLeft: '5px' }}>Free</p>
            <a href='#' onClick={showFilterOptions} style={{ paddingRight: '10px' }}>
              <img src="/images/chevron-down.png" alt="Filter" style={{ width: '10px', height: '10px', marginLeft: '5px' }} />
            </a>
          </div>
          <div style={{ width: '100%', height: '0.1px', backgroundColor: 'grey', marginBottom: '25px' }}/>
          <div>
            {posts.map((item, index) => (
              <FeedItem
                key={index}
                post={item}
              />
            ))}
          </div>
          <ToastContainer/>
        </div>
    );
  
}

export default Home;