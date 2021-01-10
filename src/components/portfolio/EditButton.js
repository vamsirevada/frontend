import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import share from "../../images/icons/noun_Share_3136056 copy.svg";

const EditButton = ({ profile }) => {
  const [displayAdd, toogleAdd] = useState(false);

  return (
    <Fragment>
      <div className="btns">
        <Link to="profile" className={`btn-white `}>
          {/* <img className='resize' src={add} alt='' /> */}
          Add/Edit Profile
        </Link>
        <a
          href="#!"
          onClick={() => toogleAdd(!displayAdd)}
          className="btn-yellow"
        >
          <img className="resize" src={share} alt="" />
          Share
        </a>

        {displayAdd && (
          <Fragment>
            <ul className="share-port">
              <li>
                {" "}
                <a
                  id="share-port-1"
                  href={`mailto:?subject=I wanted you to see this profile&body=Hi,Check out this portfolio ${" "} http://138.197.98.173/portfolio/${profile}`}
                >
                  <img src={share} alt="zx" /> Via Email
                </a>
              </li>
              <hr />
              <li>
                <a
                  href={`sms:?body=Check out this portfolio http://138.197.98.173/portfolio/${profile}`}
                  // className='share-port1'
                  id="share-port-1"
                >
                  <img src={share} alt="zx" /> Via Mobile
                </a>
              </li>
            </ul>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default EditButton;
