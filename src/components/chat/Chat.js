import React, { useState } from "react";
import ChatBox from "./ChatBox";
import Conversations from "./Conversations";
import { connect } from "react-redux";
import logo from "../../images/dummyimage.jpg";
import background from "../../images/Rectangle.png";
import Buddies from "./Buddies";

const Chat = ({ auth }) => {
  const [user, setUser] = useState(null);
  const [chatStarted, setChatStarted] = useState(false);

  return (
    <div id="full-chat">
      <aside id="fullchat-left">
        <div className="fullchat-lefttop">
          <div
            style={{
              background: `url(${
                auth.user.avatar ? auth.user.avatar : logo
              }) no-repeat center center/contain`,
            }}
            className="dp"
          ></div>
          <div>
            <input
              type="search"
              name="search"
              placeholder="Search People & Groups"
            />
          </div>
        </div>
        <div className="fullchat-leftcontainer">
          <Conversations
            auth={auth}
            setChatStarted={setChatStarted}
            setUser={setUser}
          />
          <Buddies
            auth={auth}
            setUser={setUser}
            setChatStarted={setChatStarted}
          />
        </div>
      </aside>
      {chatStarted ? (
        <section id="fullchat-right">
          <ChatBox auth={auth} user={user} />
        </section>
      ) : (
        <div style={{ background: `url(${background})` }}>
          <p
            style={{
              textAlign: "center",
              marginTop: "40%",
            }}
          >
            You Can Start Conversation with your Friends Here
          </p>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Chat);
