/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import { getConversations } from "../../actions/chat";

const Conversations = ({
  auth,
  getConversations,
  chat: { chats },
  setUser,
  setChatStarted,
}) => {
  const [conversations, setConversations] = useState([]);
  const [newConversation, setNewConversation] = useState(null);
  const handleRecipient = (recipients) => {
    for (let i = 0; i < recipients.length; i++) {
      if (recipients[i].userName !== auth.user.userName) {
        return recipients[i];
      }
    }
    return null;
  };

  useEffect(() => {
    getConversations();
    setConversations(chats);
  }, [newConversation]);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_URL);
    socket.on("messages", (data) => setNewConversation(data));
    return () => {
      socket.removeListener("messages");
    };
  }, []);

  return (
    <div>
      <div className="fullchat-leftbody">
        <div className="chats">
          <div className="chats-heading">
            <h3>
              Chats <span className="blue">2</span>
            </h3>
            <a className="blue">See More</a>
          </div>
          {conversations &&
            conversations.map((chat, index) => (
              <Fragment key={index}>
                <div
                  className="fullchat-chatgrid"
                  onClick={() => {
                    setUser(handleRecipient(chat.recipientObj));
                    setChatStarted(true);
                  }}
                >
                  <div className="dp">
                    <div className="flex-column-1">
                      <div className="chat-name">
                        <a>{handleRecipient(chat.recipientObj).fullName}</a>
                      </div>
                      <div className="chat-body">
                        <p>{chat.lastMessage}</p>
                        <div className="bubble">
                          <p>2</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  chat: state.chat,
});

export default connect(mapStateToProps, { getConversations })(Conversations);
