/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import nounPlus from "../../images/icons/noun_Plus_2310779.svg";

const Partner = ({ partners }) => {
  const part = partners.map((par) => (
    <div className="flex-1">
      <div>
        <p>{par.partner}</p>
        <a className="cross-4">
          <img src={nounPlus} alt="" />
        </a>
      </div>
    </div>
  ));
  return (
    <Fragment>
      <div className="prof-btn">
        <div className="prof-btn-grid prof-btn-grid-3">{part}</div>
      </div>
    </Fragment>
  );
};

Partner.propTypes = {
  partners: PropTypes.object.isRequired,
};

export default connect(null, null)(Partner);
