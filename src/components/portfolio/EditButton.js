/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useEffect, useState } from 'react';
import share from '../../images/icons/noun_Share_3136056 copy.svg';
import store from '../../store';
import { setAlert } from '../../actions/alert';
import { Link } from 'react-router-dom';

const EditButton = ({ profile }) => {
  const [displayAdd, toogleAdd] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      toogleAdd(false);
    }, 5000);
    return () => {
      clearTimeout(t);
    };
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `http://www.vanity.ac/portfolio/guest/${profile?.user?._id} `
    );
    store.dispatch(setAlert('Copied to Clipboard!', 'success'));
  };

  return (
    <Fragment>
      <div className='btns'>
        <span className='profile-tour-button'>
          <Link to='profile' className={`btn-white `}>
            Add/Edit Profile
          </Link>
        </span>
        <a
          id='share-button'
          onClick={() => toogleAdd(!displayAdd)}
          className='btn-yellow'
        >
          <img className='resize' src={share} alt='' />
          Share
        </a>

        {displayAdd && (
          <Fragment>
            <ul onClick={() => toogleAdd(false)} className='share-port'>
              <li>
                {' '}
                <a
                  id='share-port-1'
                  href={`mailto:?subject=Vanity Portfilo&body=Dear Sir/Madam,
                  %0D%0A
                  %0D%0AI'm ${profile?.user?.fullName}, ${profile?.status}. I came to know through [name of website/poster] that you’re looking for new talent for [so and so role] and I'm suitable for what you're looking for. You can also view my portfolio to see my work.
                  %0D%0A
                  %0D%0ACheck out this portfolio link http://www.vanity.ac/portfolio/guest/${profile?.user?._id}
                  %0D%0A
                  %0D%0ARegards
                  `}
                >
                  <img src={share} alt='zx' /> Via Email
                </a>
              </li>
              <hr />
              <li>
                <a
                  id='share-port-1'
                  href={`sms:?&body=Dear Sir/Madam,
                  %0D%0A
                  %0D%0AI'm ${profile?.user?.fullName}, ${profile?.status}. I came to know through [name of website/poster] that you’re looking for new talent for [so and so role] and I'm suitable for what you're looking for. You can also view my portfolio to see my work.
                  %0D%0A
                  %0D%0ACheck out this portfolio link http://www.vanity.ac/portfolio/guest/${profile?.user?._id} 
                  %0D%0A
                  %0D%0ARegards
                  `}
                >
                  <img src={share} alt='zx' /> Via Mobile
                </a>
              </li>
              <hr />
              <li>
                <a id='share-port-1' onClick={copyToClipboard}>
                  <img src={share} alt='zx' /> Copy Url
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
