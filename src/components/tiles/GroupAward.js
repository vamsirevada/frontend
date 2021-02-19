import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import nounPlus from "../../images/icons/noun_Plus_2310779.svg";

const GroupAward = ({ awards }) => {
  const awardtile = awards.map((awa) => (
    <div className="btn-gray btn-gray-1">
      <div className="flex-1">
        <div className="prof-dp-1"></div>
        <div className="m-1">
          {awa.award} - <Moment format="YYYY">{awa.date}</Moment>
          <button className="cross-3">
            <img src={nounPlus} alt="" />
          </button>
          <br />
          <p className="font-light">{awa.description}</p>
        </div>
      </div>
    </div>
  ));

  return (
    <Fragment>
      <div className="prof-btn-1">
        <div className="prof-btn-grid-1">{awardtile}</div>
      </div>
    </Fragment>
  );
};

GroupAward.propTypes = {
  awards: PropTypes.array.isRequired,
};

export default connect(null)(GroupAward);
