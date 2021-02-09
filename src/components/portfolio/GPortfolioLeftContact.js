import React from 'react';
import PropTypes from 'prop-types';

const GPortfolioLeftContact = ({ contactus: { email, address } }) => (
  <div>
    <table>
      <thead></thead>

      <tbody>
        <tr>
          <td className='font-bold-1 .m-1'>Address: </td>
          <td className='font-light font-light-1'>{address}</td>
        </tr>
        <tr>
          <td className='font-bold-1 .m-1'>Email-id: </td>
          <td className='font-light font-light-1'>{email}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

GPortfolioLeftContact.propTypes = {
  contactus: PropTypes.object.isRequired,
};

export default GPortfolioLeftContact;
