/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Check from '@material-ui/icons/Check';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import cancel from '../../images/icons/noun_Plus_2310779.svg';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      // borderColor: '#784af4',
    },
  },
  completed: {
    '& $line': {
      // borderColor: '#784af4',
      borderColor: '#fad300',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    color: '#fad300',
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    // color: '#784af4',
    color: '#212121',
    width: '26px',
    height: '26px',
    padding: '0.25rem',
    borderRadius: '50%',
    backgroundColor: '#fad300',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

const PortfolioStrength = ({ profile, xyz, setAlert }) => {
  const [activeStep, setActiveStep] = useState(0);

  function getSteps() {
    return ['Beginner', 'Intermediate', 'Professional'];
  }

  const getStatus = async () => {
    return await api.get('/profile/status').then((data) => {
      setAlert(data.data.message, 'success');
    });
  };

  const steps = getSteps();

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div className='ps-description'>
            <p className='ps-text'>
              Add Experience, Education to make your portfolio more Authentic
              {''}
            </p>
            <Link to='/profile' className='ps-button'>
              Add Profile
            </Link>
          </div>
        );
      case 1:
        return (
          <div className='ps-description'>
            <p className='ps-text'>
              Add your pictures, videos, soundtracks, or your blogs to make it
              more Professional{''}
            </p>
            <Link to='/addfiles' className='ps-button'>
              Add to Portfolio
            </Link>
          </div>
        );
      case 2:
        return (
          <div className='ps-description'>
            <p className='ps-text'>
              You're good to share your portfolio to others.
            </p>
            <a onClick={() => getStatus()} className='ps-button'>
              Get's Started!
            </a>
          </div>
        );
      default:
        return 'null';
    }
  }

  useEffect(() => {
    if (profile.experience.length !== 0 || profile.education.length !== 0) {
      setActiveStep(1);
    }

    if (xyz.length > 0) {
      setActiveStep(2);
    }
  }, [profile.experience.length, profile.education.length, xyz.length]);

  return (
    <>
      {!profile.progressStatus && (
        <div className='profile-strength'>
          <div className='profile-strength-container'>
            <div className='profile-strength-text'>
              <h6 className='strength-bold'>
                Profile Strength:{' '}
                <span className='strength-light'>{steps[activeStep]}</span>
              </h6>
              <div>
                <img src={cancel} alt='' />
              </div>
            </div>

            <Stepper
              className='ps-stepper'
              alternativeLabel
              activeStep={activeStep}
              connector={<QontoConnector />}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={QontoStepIcon}>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            <div>{getStepContent(activeStep)}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default connect(null, { setAlert })(PortfolioStrength);
