import React, { useEffect } from 'react';
import Navbar from '../layout/NavbarBlog';
import Articles from '../article/Articles';
// import Footer from '../layouts/Footer';
import { connect } from 'react-redux';
import { getArticles } from '../../actions/article';

const Blog = ({ article: { articles, filtered }, getArticles }) => {
  useEffect(() => {
    getArticles();
  }, [getArticles]);
  return (
    <>
      <Navbar dislogout={false} />
      <div className='bloghome'>
        <div>
          {' '}
          <Articles articles={articles} filtered={filtered} />
        </div>
        {/* <CustomerForm /> */}
        {/* <Footer /> */}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  article: state.article,
});

export default connect(mapStateToProps, { getArticles })(Blog);
