import React, { Fragment } from "react";
import macbook from "../../../images/macbook_white@2x.png";

const Page2 = () => {
  return (
    <Fragment>
      <div id="page-2" className="page-columns page">
        <div className="container">
          <div className="column">
            <div className="column-1">
              <img
                className="macimage"
                src={macbook}
                alt="Macbook macbook_air"
              />
              <div className="circlebox"></div>
            </div>

            <div className="column-2">
              <h1 className="ft-heading ft-heading-light">
                Discover top industry professionals
              </h1>
              <p className="ft-para ft-para-light">
                You can search and find the top professionals from artist to
                technicians and engineers from all leading film & drama, music,
                modeling & fashion institutes of India and across entertainment
                industry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Page2;
