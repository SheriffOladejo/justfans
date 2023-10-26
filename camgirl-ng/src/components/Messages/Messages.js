import './Messages.css';
import { ChatList, MessageList } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css'
import Navbar from '../Navbar/Navbar';
import SideBar from '../SideBar/SideBar';
import ChatItem from './ChatItem';
import React from 'react';
import ProfilePicture from '../ProfilePicture/ProfilePicture';

function Messages () {

    const messageListReferance = React.createRef();

    const chatList = [1,2,3,4,5,6,7,8,9,0,11,12,13];

    return (
        <div style={{ backgroundColor:'#EBEBEB' }}>
            <Navbar/>
            <div className='messages-main-container'>
                <SideBar pageIndex={4}/>
                <div className='messages-chat-container'>
                    <form className="messages-chat-search-form">
                        <div className="messages-chat-search-container">
                            <input type="text" placeholder="Search messages" className="messages-chat-search-input" />
                            <img src="/images/search-black.png" alt="Search" className="messages-chat-search-icon" />
                        </div>
                    </form>
                    <h6 className='messages-chat-title'>Messages</h6>
                    <div className="messages-chat-divider"/>
                    <div className="messages-chat-list">
                        {chatList.map((comment, index) => (
                        <ChatItem
                            key={index}
                        />
                        ))}
                    </div>
                </div>

                <div className='messages-convo-container'>
                    <div className='messages-convo-recipient-info-container'>
                        <div className='messages-convo-recipient-info'>
                            <ProfilePicture zIndex={"1"}/>
                            <span className="messages-convo-recipient-display-name">Sheriff Olad
                            <img src="/images/verifiied.png" alt="Super user" className="messages-convo-recipient-user-verified"/></span>
                            <p className='messages-convo-recipient-username'>@caseyii2</p>
                        </div>
                        <img src="/images/more-white.png" alt="Options" className="messages-convo-options"/>
                    </div>
                    <div className='messages-convo-list'>
                        <MessageList
                            referance={messageListReferance}
                            className='messages-convo-list2'
                            lockable={false}
                            toBottomHeight={'100%'}
                            dataSource={[
                                {
                                    position: 'right',
                                    type: 'text',
                                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                    date: new Date(),
                                },
                                {
                                    position: 'left',
                                    type: 'text',
                                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                    date: new Date(),
                                },
                                {
                                    position: 'right',
                                    type: 'text',
                                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                    date: new Date(),
                                },
                                {
                                    position: 'left',
                                    type: 'text',
                                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                    date: new Date(),
                                },
                                {
                                    position: 'left',
                                    type: 'text',
                                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                    date: new Date(),
                                },
                                {
                                    position: 'right',
                                    type: 'text',
                                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                    date: new Date(),
                                },
                                {
                                    position: 'left',
                                    type: 'text',
                                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                    date: new Date(),
                                },
                                {
                                    position: 'right',
                                    type: 'text',
                                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                    date: new Date(),
                                },
                                {
                                    position: 'left',
                                    type: 'text',
                                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                    date: new Date(),
                                },
                                {
                                    position: 'right',
                                    type: 'text',
                                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                    date: new Date(),
                                },
                                {
                                    position: 'left',
                                    type: 'text',
                                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                    date: new Date(),
                                },
                                {
                                    position: 'right',
                                    type: 'text',
                                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elitss',
                                    date: new Date(),
                                },
                                {
                                    position: 'right',
                                    type: 'text',
                                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elitss',
                                    date: new Date(),
                                },
                                {
                                    position: 'right',
                                    type: 'text',
                                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elitss',
                                    date: new Date(),
                                },
                                {
                                    position: 'right',
                                    type: 'text',
                                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elitss',
                                    date: new Date(),
                                },
                                {
                                    position: 'right',
                                    type: 'text',
                                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elitss',
                                    date: new Date(),
                                },
                            ]}
                        />
                    </div>
                    <div className="messages-comment-container">
                      <div style={{ width:'100%', display: 'flex', displayDirection: 'row', alignItems: 'center'}}>
                        <div className="messages-comment-box">
                          <a href='#' style={{ paddingLeft: '10px' }}>
                            <img
                              src="/images/gallery-pink.png"
                              alt="Attachment"
                            />
                          </a>
                          <input placeholder='Type message' className='messages-comment-input' />
                          <a href='#' style={{ paddingRight: '10px' }}>
                            <img
                              src="/images/send.png"
                              alt="Send"
                            />
                          </a>
                        </div>
                      </div>
                  </div>
                </div>
                
                {/* <div className='messages-convo-inactive-container'>
                    <div className='messages-no-chat-container'>
                        <img className='messages-no-chat-icon' src='/images/chat-inactive.png'/>
                        <p className='messages-start-convo-title'>Start a convo</p>
                        <p className='messages-start-convo-text'>Choose from your existing conversations, start a new one, or just keep swimming. </p>
                        <button className='messages-start-conversation'>
                            <div className='messages-start-coversation-row'>
                                <p>Send message</p>
                                <img src='images/sms-edit.png' />
                            </div>
                        </button>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default Messages;