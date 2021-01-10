import React, { Fragment } from 'react';
import ArticleItem from './ArticleItem';
import Spinner from '../layout/Spinner';

// {posts.map((post) => (
//   <PostItem key={post.id} post={post} />
//   // <h3>{post.title}</h3>
// ))}

const Articles = ({ articles, filtered }) => {
  return (
    <Fragment>
      {articles !== null ? (
        <div id='popular' className='popular'>
          <div className='container'>
            <div className='container-header'>
              <h2>{/* <span>All Posts</span> */}</h2>
            </div>

            <div className='container-content'>
              <div className='post-flex'>
                {filtered !== null
                  ? filtered.map((article) => (
                      <ArticleItem
                        key={article._id}
                        article={article}
                        timeout={500}
                      />
                    ))
                  : articles.map((article) => (
                      <ArticleItem key={article._id} article={article} />
                    ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Articles;
