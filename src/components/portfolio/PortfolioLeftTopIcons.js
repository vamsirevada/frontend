import React, { Fragment, useState } from "react";
import back from "../../images/icons/back(1).svg";
import setting from "../../images/icons/noun_Settings_3144389.svg";
import share from "../../images/icons/noun_Share_3136056 copy.svg";

const PortfolioLeftTopIcons = ({ profile }) => {
  const [displayAdd, toogleAdd] = useState(false);
  return (
    <div>
      <a href="#!">
        <img className="back-arrow" src={back} alt="back" />
      </a>
      <a href="#!" onClick={() => toogleAdd(!displayAdd)}>
        <img className="setting" src={setting} alt="" />
      </a>

      {displayAdd && (
        <Fragment>
          <a
            className="share-port"
            id="share-port-1"
            href={`mailto:?subject=I wanted you to see this profile&body=Hi,Check out this portfolio http://localhost:3000/portfolio/${profile}`}
          >
            <img src={share} alt="zx" /> Share Via Email
          </a>
          <a
            href={`sms://+14035550185?body=Check out this portfolio http://localhost:3000/portfolio/${profile}`}
            className="share-port1"
            id="share-port-1"
          >
            <img src={share} alt="zx" /> Share Via Mobile
          </a>
        </Fragment>
      )}
    </div>
  );
};

export default PortfolioLeftTopIcons;
