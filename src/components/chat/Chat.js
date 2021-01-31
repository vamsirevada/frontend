/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { getChats, afterPostMessage } from "../../actions/chat";
import moment from "moment";
import closebutton from "../../images/noun_Plus_2310779.svg";
import sendbutton from "../../images/sendbutton.svg";
import attach from "../../images/attach.svg";
import path from "../../images/path 2.svg";
import io from "socket.io-client";

// import "./Chat.css";
import axios from "axios";

const socket = io(process.env.REACT_APP_API_URL, { transports: ["websocket"] });

function Chat({ getChats, afterPostMessage, auth, profile, chat: { chats } }) {
  const dummy = useRef();
  const fileInput = React.createRef();

  useEffect(() => {
    getChats();
    socket.on("Output Chat Message", (messageFromBackend) => {
      afterPostMessage(messageFromBackend);
    });
  }, [afterPostMessage, getChats]);

  const [formValue, setFormValue] = useState("");

  const openForm = () => {
    document.getElementById("myForm1").style.display = "block";
  };

  const closeForm = () => {
    document.getElementById("myForm1").style.display = "none";
  };

  const onOpenFileDialog = () => {
    fileInput.current.click();
  };

  const handleChange = (files) => {
    const formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    axios.post("/api/chat/uploadfiles", formData, config).then((response) => {
      if (response.data.success) {
        console.log(response.data);
      }
    });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const chatMessage = formValue;
    const userId = auth.user._id;
    const userName = auth.user.userName;
    const userImage = auth.user.avatar;
    const nowTime = moment();
    const type = "Text";
    socket.emit("Input Chat Message", {
      chatMessage,
      userId,
      userName,
      userImage,
      nowTime,
      type,
    });
    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <button className="open-button open-button-1" onClick={openForm}>
        <span
          style={{
            background: `url(${profile?.avatar}) no-repeat center center/contain`,
          }}
          className="dp-1"
        ></span>
        {profile?.user?.fullName}
      </button>

      <div className="chat-popup-1" id="myForm1">
        <div className="chatbox-top">
          <div className="chatboxtop-left">
            <span
              style={{
                background: `url(${profile?.avatar}) no-repeat center center/contain`,
              }}
              className="dp-1"
            ></span>
            <div>
              <h4>{profile?.user?.fullName}</h4>
              <small>Active Now</small>
            </div>
          </div>
          <div className="chatboxtop-right">
            <a type="button" className="resize">
              <img src={path} alt="" />
            </a>
            <a type="button" className="btn cancel" onClick={closeForm}>
              <img src={closebutton} alt="" />
            </a>
          </div>
        </div>

        <div className="form-container-2">
          <div className="flex-c">
            <div className="flex-c-r">
              <p className="b-1">How can we help? We're here for you!</p>
            </div>

            {chats &&
              chats.map((chat) => (
                <ChatMessage key={chat._id} {...chat} auth={auth} />
              ))}

            <div ref={dummy}></div>

            <div className="flex-c-r">
              <p className="b-1">Hello</p>
            </div>
          </div>
        </div>

        <form onSubmit={sendMessage} className="form-container-2">
          <div className="form-grid">
            <div className="form-flex-left">
              <input
                type="text"
                name="typemessage"
                value={formValue}
                placeholder="Type your Message"
                onChange={(e) => setFormValue(e.target.value)}
              />
              <a>
                <input
                  accept="audio/*,video/*,image/*"
                  onChange={handleChange}
                  type="file"
                  hidden={true}
                  ref={fileInput}
                />
                <img onClick={onOpenFileDialog} src={attach} alt="attach" />
              </a>
            </div>
            <div className="form-flex-right">
              <a type="submit">
                <img src={sendbutton} onClick={sendMessage} alt="" />
              </a>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

function ChatMessage(props) {
  const messageClass =
    props.sender._id === props.auth.user._id ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass} flex-2`}>
        <span
          style={{
            background: `url(${props.sender.avatar}) no-repeat center center/contain`,
          }}
          className="dp-2"
        ></span>
        <p className="b-2">{props.message}</p>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  chat: state.chat,
});

export default connect(mapStateToProps, { getChats, afterPostMessage })(Chat);
