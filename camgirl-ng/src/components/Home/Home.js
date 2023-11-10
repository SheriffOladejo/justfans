import Stories from '../Home/Stories/Stories';
import './Home.css';
import FeedItem from '../Home/Feed/FeedItem';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import { useState, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { ToastContainer } from 'react-toastify';
import ReactPlayer from 'react-player';
import Picker from 'emoji-mart';

function Home () {

    const [postText, setPostText] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const textareaRef = useRef(null);

    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedGif, setSelectedGif] = useState(null);
    const [attachmentType, setAttachmentType] = useState('');

    const attachmentRef = useRef();
    const gifRef = useRef();

    const showFilterOptions = (event) => {
        event.preventDefault();
    }

    const handleEmojiSelect = (emoji) => {
      const { selectionStart, selectionEnd } = textareaRef.current;
  
      const newText =
        postText.substring(0, selectionStart) +
        emoji.native +
        postText.substring(selectionEnd);
  
      setPostText(newText);
  
      const newCursorPosition = selectionStart + emoji.native.length;
      textareaRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
  
      setShowEmojiPicker(false);
    };

    const removeAttachment = () => {
      setSelectedVideo(null);
      setSelectedImage(null);
      setSelectedGif(null);
      setAttachmentType('');

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
        } else if (isVideo) {
          setSelectedVideo(selectedFile);
          setSelectedImage(null);
          setSelectedGif(null);
          setAttachmentType('video');
        } else {
          console.error('Invalid file type. Please select an image or a video.');
        }
      }
    }

    const handleGifAttachment = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        setSelectedGif(selectedFile);
        setAttachmentType('gif');
      }
    }

    const openFileChooser = () => {
      attachmentRef.current.click();
    };

    const openGifChooser = () => {
      gifRef.current.click();
    };

    const feedData = [
      {
        profilePicture: "/images/profile-picture.png",
        displayName: "Sheriff",
        username: "@deen",
        postTime: "2hr ago",
        caption: "Pretty windy day today! Decided to go do some adventuring and shooting outdoors a bit today ❤️",
        mediaUrl: "/images/feed.png",
      },
      {
        profilePicture: "/images/profile-picture.png",
        displayName: "Sheriff",
        username: "@deen",
        postTime: "2hr ago",
        caption: "Pretty windy day today! Decided to go do some adventuring and shooting outdoors a bit today ❤️",
        mediaUrl: "/images/feed.png",
      },
    ];

    const post = () => {

    }

    return (
        <div className="home-container">
          <Stories />
          <div className="create-post-container">
              <div className="textfield-and-profile">
                  <div>
                    <ProfilePicture marginTop="15px" zIndex={"1"}/>
                  </div>
                  
                  <div className='home-create-post'>
                    <div className="home-post-publicity">
                      <img className="home-post-publicity-icon" src="/images/globe.png" alt="Image" />
                      <p className="home-post-publicity-text">Everyone</p>
                      <img className="home-post-publicity-icon-arrow" src="/images/chevron-down.png" alt="Image" />
                    </div>
                    <TextareaAutosize
                      className="textfield"
                      placeholder="What's happening!?"
                      ref={textareaRef}
                      value={postText}
                      onChange={(e) => setPostText(e.target.value)}
                    />
                    {showEmojiPicker && (
                      <Picker
                        set="emojione"
                        onSelect={handleEmojiSelect}
                        style={{ position: 'absolute', bottom: '50px', right: '10px' }}
                      />
                    )}

                    <div className="home-post-attachment-container">
                      
                      { (selectedGif || selectedImage) && 
                        <img className="home-post-attachment-media" 
                        src={selectedGif === null ? URL.createObjectURL(selectedImage) : URL.createObjectURL(selectedGif)}/> 
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
                        <div style={{ display:'flex', flexDirection:'row' }}>
                          <div onClick={removeAttachment} className="home-post-attachment-close-container">
                            <img className="home-post-attachment-close" src="/images/close.png"/>
                          </div>
                          { (selectedImage || selectedVideo) && <h4  className="home-post-attachment-edit">Edit</h4> }
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
                  <div className="element" onClick={openGifChooser}>
                    <img src="/images/gif.png" alt="Gif" />
                  </div>
                  <div className="element">
                    <img src="/images/live.png" alt="Live Video" />
                  </div>
                </div>
                <button className="post-button" onClick={post} disabled={!postText}>
                  Post
                </button>
                <input type="file" style={{ display: 'none' }} accept="image/gif" ref={gifRef} onChange={handleGifAttachment} />
              
                <input type="file" style={{ display: 'none' }} accept="image/jpeg, image/png, video/mp4" ref={attachmentRef} onChange={handlePostAttachment} />
              </div>
          </div>
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
            {feedData.map((item, index) => (
              <FeedItem
                key={index}
                profilePicture={item.profilePicture}
                displayName={item.displayName}
                username={item.username}
                postTime={item.postTime}
                caption={item.caption}
                mediaUrl={item.mediaUrl}
              />
            ))}
          </div>
          <ToastContainer/>
        </div>
    );
}

export default Home;