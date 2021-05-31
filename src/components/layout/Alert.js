import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { removeAlert } from '../../actions/alert'

const Alert = ({ alerts }) => {
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div
        key={alert.id}
        className={`alert alert-${alert.alertType}`}
        data-aos='fade-left'
        data-aos-delay='50'
        data-aos-duration='250'
        data-aos-easing='ease-in-out'
      >
        {alert.msg}
      </div>
    ))
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
  // removeAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
