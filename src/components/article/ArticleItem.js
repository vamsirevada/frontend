import React from 'react';
// import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import clock from '../../images/clock.svg';
import URL from '../../images/Article-1b.png';

const ArticleItem = ({ article }) => {
  const { _id, title, author, time } = article;

  // const URL = `/uploads/${imgName}`;
  return (
    <div>
      <div className='post'>
        <Link to={`/posts/${_id}`} className='box1 box'>
          <img src={URL} alt='Img Not Found' />
        </Link>
        <div>
          <h2>
            <Link to={`/blog/${_id}`} className='hover'>
              {title}
            </Link>
          </h2>
        </div>
        <div className='flex-form'>
          <div className='flex-column1'>
            <div className='author-img'>
              <p>By:</p>
              {/* <img src='images/image29.png' alt='' /> */}
            </div>
            <p>
              <span className='flex-text'>{author}</span>
            </p>
          </div>
          <br />
          <div className='flex-column3'>
            <p>|</p>
          </div>
          <br />
          <div className='flex-column2'>
            <p>
              <img src={clock} alt='' />
              <span className='flex-text'> {time}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ArticleItem.propTypes = {
//   post: PropTypes.object.isRequired,
// };

export default ArticleItem;
