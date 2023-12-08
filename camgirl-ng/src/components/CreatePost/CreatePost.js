import './CreatePost.css';
import { useState, useRef, useEffect } from 'react';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import TextareaAutosize from 'react-textarea-autosize';
import { ToastContainer, toast } from 'react-toastify';
import ReactPlayer from 'react-player';
import EmojiPicker from 'emoji-picker-react';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Constants from '../../utils/Constants';
import { initializeApp } from 'firebase/app';
import Post  from '../../models/Post';
import DbHelper from '../../utils/DbHelper';
import { isUserSignedIn } from '../../utils/Utils';
import { useNavigate } from 'react-router-dom';
import SelectGif from '../SelectGif/SelectGif';
import { PUBLICITY_OPTIONS } from '../../utils/Constants';

function CreatePost () {
    const navigate = useNavigate();

    const dbHelper = new DbHelper();

    const [loading, setLoading] = useState(false);

    const [postText, setPostText] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const textareaRef = useRef(null);

    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedGif, setSelectedGif] = useState(null);

    const [user, setUser] = useState(null);
    const [attachmentType, setAttachmentType] = useState('');
    const [attachmentFileName, setAttachmentFileName] = useState('');
    const [attachmentFile, setAttachmentFile] = useState('');

    const attachmentRef = useRef();
    const gifRef = useRef();

    const [isTablet, setIsTablet] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const [selectedPublicity, setSelectedPublicity] = useState('Everyone');
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

    const backPressed = () => {
        navigate(-1);
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
          navigate('/main-page');
        }
        else {
          setIsDesktop(true);
          setIsMobile(false);
          setIsTablet(false);
          navigate('/main-page');
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
      const firebaseApp = initializeApp(Constants.FIREBASE_CONFIG);
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
        const signinData = isUserSignedIn();
        
        const username = signinData["username"];
        const email = signinData["email"];
        var _u = null;
        if (email === null) {
          _u = await dbHelper.getAppUserByUsername(username);
        }
        else {
          _u = await dbHelper.getAppUserByEmail(email);
        }
        setUser(_u);
      };
      fetchUser();
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
          setAttachmentType('image');
          setAttachmentFileName(selectedFile.name);
        } else if (isVideo) {
          setSelectedVideo(selectedFile);
          setSelectedImage(null);
          setSelectedGif(null);
          setAttachmentType('video');
          setAttachmentFileName(selectedFile.name);
        } else {
          console.error('Invalid file type. Please select an image or a video.');
        }
      }
    }

    const handleGifAttachment = (selectedGif) => {
      setSelectedGif(selectedGif);
      setAttachmentFileName('gif');
      setAttachmentType('gif');
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
        post.setPostPrivacy(0);
        post.setCreationDate(Date.now());
        post.setCommentsPrivacy(0);
        post.setLikes(0);
        post.setTips(0);
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
        
        
      }
  

    return (
        <div  onClick={removeDialogs} className='createPost-container'>
            <div>
                <div className="createPost-button-container">
                    <img onClick={backPressed} className='createPost-back-button' src="images/back-arrow.png"/>
                    <button className="createPost-button" onClick={createPost} disabled={ !postText && !selectedImage && !selectedVideo && !selectedGif }>
                        Post
                    </button>
                </div>
                <div className='divider'/>
                <div className="create-post-container">
                    <div className="textfield-and-profile">
                        <div>
                            <ProfilePicture marginTop="15px" zIndex={"1"}/>
                        </div>
                        
                        <div className='home-create-post'>
                            <div className="home-post-publicity" onClick={togglePublicityDropdown}>
                                <img className="home-post-publicity-icon" src="/images/globe.png" alt="Image" />
                                <p className="home-post-publicity-text">{selectedPublicity}</p>
                                <img className="home-post-publicity-icon-arrow" src="/images/chevron-down.png" alt="Image" />
                            </div>
                            {isPublicityDropdownOpen && (
                                <div className='publicity-dropdown-container'>
                                    <h5>Who can view and reply?</h5>
                                    <p className='publicity-desc'>Choose who can view and reply this post</p>
                                    <div className="publicity-dropdown-list">
                                    {PUBLICITY_OPTIONS.map((option) => (
                                        <div className='publicity-desc' key={option} onClick={() => handlePublicityOptionClick(option)}>
                                        {option}
                                        </div>
                                    ))}
                                    </div>
                                </div>
                            )}
                            <TextareaAutosize
                                className="textfield"
                                placeholder="What's happening!?"
                                ref={textareaRef}
                                value={postText}
                                onChange={(e) => setPostText(e.target.value)}
                            />
                            {showEmojiPicker && (
                                <EmojiPicker
                                    onEmojiClick={handleEmojiSelect}
                                />
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
                    <div className='divider'/>
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
                        <input type="file" style={{ display: 'none' }} accept="image/gif" ref={gifRef} onChange={handleGifAttachment} />
                    
                        <input type="file" style={{ display: 'none' }} accept="image/jpeg, image/png, video/mp4" ref={attachmentRef} onChange={handlePostAttachment} />
                    </div>
                </div>
                {showGifs && <div className='create-post-gif-div'><SelectGif onSelect={handleGifAttachment} /></div>}
            </div>
        </div>
    );
}

export default CreatePost;