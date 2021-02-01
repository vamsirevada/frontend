import React from "react";
import PropTypes from "prop-types";

const GroupContact = ({ contactus: { email, address } }) => (
  <div className="btn-gray-g btn-gray-f">
    <div>
      <span className="b-1"> Email :</span>
    </div>
    <div>
      <span className="font-dark">{email} </span>
    </div>
    <div>
      <span className="b-1">Address :</span>
    </div>
    <div>
      <span className="font-dark">{address}</span>
    </div>
  </div>
);

GroupContact.propTypes = {
  contactus: PropTypes.object.isRequired,
};

export default GroupContact;
