import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import add from "../../images/noun_Add Friend_2987727 (2).svg";
import mail from "../../images/chat.svg";
import { connect } from "react-redux";
import { sendBuddyRequest } from "../../actions/profile";
import { motion } from "framer-motion";

const Friend = ({
  profile: { _id, avatar, user, status, location, buddies, requests },
  sendBuddyRequest,
  displayAdd,
  remove,
  docs,
}) => {
  const sendRequest = async () => {
    await sendBuddyRequest(_id);
  };

  const onClick = () => {
    sendRequest();
  };

  const meta = (url) => {
    var new_url = url.substring(0, url.indexOf("?alt"));
    const ext = new_url.substring(new_url.lastIndexOf("."));
    return ext;
  };

  const documents = docs && docs.filter((doc) => doc?.userId === user?._id);
  const filter = documents.filter(
    (doc) => doc?.type !== "audio" || doc?.type !== "blog"
  );

  return (
    <div className="connect-main ">
      <div className="connect-left">
        <div className="connect-left-top">
          <div
            style={{
              background: `url(${avatar}) no-repeat center center/cover`,
            }}
            className="display-pic"
          ></div>
          <div className="flex-c">
            <p>
              <span className="bold">
                {user?.fullName && user?.fullName}
                {user?.groupName && user?.groupName}
              </span>{" "}
              <br />
              <span className="second-bold">
                {user?.userName && user?.userName}
              </span>{" "}
              <br />
              <span className="second-bold">{status}</span> <br />
              <span className="second-bold">{location}</span>
              <br />
              <span className="third-bold">
                Connections : <span className="f-1">{buddies.length}</span>
              </span>
            </p>
          </div>
        </div>

        <div className="connect-left-bottom">
          <div className="btn-b">
            {" "}
            <Link to={`/portfolio/${user?._id}`} className="btn-blue">
              {/* <img src={add} alt='' /> */}
              View Profile
            </Link>
          </div>
          <div className="btn-b">
            {" "}
            <a href="#!" className="btn-blue" onClick={() => onClick()}>
              <img src={add} alt="" />
            </a>
          </div>

          <div className="btn-g">
            {" "}
            <a href="#!" className="btn-blue g-1" onClick={() => remove(_id)}>
              <img src={mail} alt="" />
            </a>
          </div>
        </div>
      </div>

      {displayAdd && (
        <div className="connect-right">
          {filter &&
            filter.slice(0, 4).map(
              (doc) =>
                meta(doc.url) !== ".mp3" && (
                  <div className="pic-1" key={doc.id}>
                    {(doc.type) === "video" ? (
                      <motion.video
                        controls
                        src={doc.url}
                        alt="uploaded pic"
                        initial={{
                          opacity: 0,
                          height: "100%",
                          width: "100%",
                        }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                      />
                    ) : (
                      <img src={doc.url} height="100%" width="100%" alt="" />
                    )}
                  </div>
                )
            )}
        </div>
      )}
    </div>
  );
};

Friend.propTypes = {
  profile: PropTypes.object.isRequired,
  sendBuddyRequest: PropTypes.func.isRequired,
};

export default connect(null, { sendBuddyRequest })(Friend);
