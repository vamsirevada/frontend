/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import {
  sendConversationMessage,
  getConversationMessages,
} from "../../actions/chat";
import Moment from "react-moment";
// import moment from "moment";
import sendbutton from "../../images/sendbutton.svg";
import attach from "../../images/attach.svg";
import emoji from "../../images/emoji.svg";
import path from "../../images/path.svg";
import call from "../../images/call.png";
import videocall from "../../images/videocall.png";

const ChatBox = ({
  auth,
  user,
  getConversationMessages,
  sendConversationMessage,
  chat: { chatsbyid },
  conversationId,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [lastMessage, setLastMessage] = useState(null);
  const chatBottom = useRef(null);

  useEffect(() => {
    reloadMessages();
    scrollToBottom();
  }, [lastMessage, conversationId]);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_URL);
    socket.on("messages", (data) => setLastMessage(data));
  }, []);

  const reloadMessages = () => {
    if (conversationId !== null) {
      getConversationMessages(user._id);
      setMessages(chatsbyid);
    } else {
      setMessages([]);
    }
  };

  const scrollToBottom = () => {
    chatBottom.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendConversationMessage(user._id, newMessage)
    setNewMessage("");
  };

  return (
    <>
      <div className="fullchat-maintop">
        <div className="fullchat-maintop-left">
          <div
            style={{
              background: `url(${user.avatar}) no-repeat center center/cover`,
            }}
            className="dp-4"
          ></div>
          <div className="flex-column">
            <div className="chat-name">
              <a>{user.fullName}</a>
            </div>
            <div className="chat-body">
              <p>Active Now</p>
            </div>
          </div>
        </div>
        <div className="fullchat-maintop-right">
          <div className="m-1">
            <a>
              <img src={videocall} alt="" />
            </a>
          </div>
          <div className="m-1">
            <a>
              <img src={call} alt="" />
            </a>
          </div>
          <div className="m-1">
            <a>
              <img src={attach} alt="" />
            </a>
          </div>
          <div className="m-1">
            <a>
              <img src={path} alt="" />
            </a>
          </div>
        </div>
      </div>

      <div className="fullchat-mainbody">
        <div className="fullchat-mainbody-container">
          <div className="flex-c">
            {messages &&
              messages.map((message) => (
                <div
                  key={message._id}
                  className={`${
                    message.fromObj[0]._id === auth.user._id
                      ? "flex-c-r"
                      : "flex-c-2"
                  }`}
                >
                  <div className="flex-c-r-left">
                    <p className="b-1">{message.message}</p>
                    <small className="i-1">
                      <Moment format="DD MMM YY, hh:mm A">
                        {message.createdAt}
                      </Moment>
                    </small>
                  </div>
                  <span
                    style={{
                      background: `url(${message.fromObj[0].avatar}) no-repeat center center/cover`,
                    }}
                    className={`${
                      auth.user._id === message.fromObj[0]._id
                        ? "dp-4-1 flex-c-r-right"
                        : "dp-2"
                    }`}
                  ></span>
                </div>
              ))}
            <div ref={chatBottom} />
          </div>
        </div>
      </div>

      <div className="fullchat-type">
        <div className="form-grid">
          <div className="form-flex-left">
            <form onSubmit={handleSubmit}>
              <textarea
                type="text"
                name="typemessage"
                value={newMessage}
                placeholder="Type your Message"
                onChange={(e) => setNewMessage(e.target.value)}
                rows="1"
              ></textarea>
              <a>
                <img src={emoji} alt="" />
              </a>
              <a>
                <img src={attach} alt="" />
              </a>
            </form>
          </div>
          <div className="form-flex-right">
            <a type="submit">
              <img src={sendbutton} onClick={handleSubmit} alt="" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  chat: state.chat,
});

export default connect(mapStateToProps, {
  getConversationMessages,
  sendConversationMessage,
})(ChatBox);
