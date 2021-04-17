/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import share from '../../images/icons/noun_Share_3136056 copy.svg';

const EditButton = ({ profile }) => {
  const [displayAdd, toogleAdd] = useState(false);
  return (
    <Fragment>
      <div className='btns'>
        <span className='profile-tour-button'>
          <Link to='profile' className={`btn-white `}>
            Add/Edit Profile
          </Link>
        </span>

        <a onClick={() => toogleAdd(!displayAdd)} className='btn-yellow'>
          <img className='resize' src={share} alt='' />
          Share
        </a>

        {displayAdd && (
          <Fragment>
            <ul className='share-port'>
              <li>
                {' '}
                <a
                  id='share-port-1'
                  href={`mailto:?subject=Vanity Portfilo&body=Hi,%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20
                  ${'       '} Myself ${profile?.user.fullName} and I'm a ${
                    profile?.status
                  } I noticed on [name of the website] that you’re looking [ for so and so role] I’d be happy to help you out with the process. You can also view my portfolio to see my work. %20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20
                   Check out this portfolio ${' '} http://www.vanity.ac/portfolio/${
                    profile._id
                  } 
                  ${'     '}%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20
                  %20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20
                  Kind Regards
                  `}
                >
                  <img src={share} alt='zx' /> Via Email
                </a>
              </li>
              <hr />
              <li>
                <a
                  href={`sms:?body=Hi,%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20
                  ${'       '} Myself ${profile?.user.fullName} and I'm a ${
                    profile?.status
                  } I noticed on [name of the website] that you’re looking [ for so and so role] I’d be happy to help you out with the process. You can also view my portfolio to see my work. %20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20
                   Check out this portfolio ${' '} http://www.vanity.ac/portfolio/${
                    profile._id
                  } 
                  ${'     '}%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20
                  %20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20
                  Kind Regards`}
                  // className='share-port1'
                  id='share-port-1'
                >
                  <img src={share} alt='zx' /> Via Mobile
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
