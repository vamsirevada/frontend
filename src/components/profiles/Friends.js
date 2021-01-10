import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Friend from "./Friend";
import { setAlert } from "../../actions/alert";
import UseFirestore from "../addportfolio/UseFireStore";

const Friends = () => {
  const [budProfiles, setBudProfiles] = useState({
    profiles: null,
    empty: null,
  });

  const { docs } = UseFirestore("images");

  const getBuddies = async () => {
    try {
      const res = await axios.get(`api/profile/buddyProfiles`);

      let empty = true;
      if (res.data.length > 0) {
        empty = false;
      }

      setBudProfiles({
        profiles: res.data,
        empty,
      });
    } catch (err) {
      return (
        <div className="card-md buddy-card">
          <h2> Problem Loading Buddies </h2>
        </div>
      );
    }
  };

  const remove = async (profileid) => {
    try {
      await axios.delete(`api/profile/buddy/${profileid}`);

      setAlert("Successfully removed", "success");
      getBuddies();
    } catch (err) {
      setAlert(err.response.data.msg, "danger");
    }
  };

  useEffect(() => {
    getBuddies();
  }, []);
  return (
    <div className="c-list">
      <div className="c-list-container c-1">
        <div className="search-flex search-flex-1">
          <div>
            <h1 className="name name-f">Friends</h1>
          </div>
        </div>
        <hr className="hori" />
        {budProfiles.empty === null ? (
          <h3>Loading </h3>
        ) : (
          <Fragment>
            {budProfiles.empty ? (
              <Fragment>
                <h2> You have no buddies </h2>
              </Fragment>
            ) : (
              <Fragment>
                {budProfiles.profiles.map((profile) => (
                  <Friend
                    key={profile._id}
                    profile={profile}
                    remove={remove}
                    displayAdd={true}
                    docs={docs}
                  />
                ))}
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Friends;
