import React, { Fragment } from "react";
import create from "../../../images/create.png";

const Page4 = () => {
  return (
    <Fragment>
      <div id="page-4" className="page4-columns page">
        <div className="container">
          <div className="column">
            <div className="column-1">
              <img className="collobrate" src={create} alt="collobrate" />
              <br />
            </div>

            <div className="column-2">
              <h1 className="ft-heading ft-heading-light">
                Create and share Portfolio
              </h1>
              <p className="ft-para ft-para-light">
                You can showcase your work in a professional and purposeful
                manner to industry professionals. Also, you can share your
                personal portfolios across various other platforms using the
                link.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Page4;
