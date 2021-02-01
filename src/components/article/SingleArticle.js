/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import NavbarBlog from "../layout/NavbarBlog";
import { connect } from "react-redux";
import { getArticle, clearArticles } from "../../actions/article";
import clock from "../../images/clock.svg";
import URL from "../../images/Article-1b.png";
// import ShareSocialButton from "../social/ShareSocialButton";
// import ShareSocialButtonC from "../social/ShareSocialButtonC";

const Single = ({ article: { article }, getArticle, clearArticles, match }) => {
  useEffect(() => {
    getArticle(match.params.id);
    //eslint-disable-next-line
  }, []);

  const { title, author, body, time, imgName } = article;

  // const link = `/uploads/${imgName}`;

  // const onClick = () => {
  //   clearArticles();
  // };
  console.log(imgName);

  return (
    <>
      <NavbarBlog dislogout={false} />
      <div>
        {/* <div className='back'>
          <Link to='/' onClick={onClick}>
            <img
              src={process.env.PUBLIC_URL + '/images/icons/back.png'}
              alt=''
            />
          </Link>
        </div> */}
        <div className="single-container">
          <div className="showcase">
            <div className="showcase-image-1">
              <img src={URL} alt="" />
            </div>

            <div className="showcase-content-1">
              <div className="container">
                <div className="container-header">
                  <h1>
                    {" "}
                    <a>{title}</a>
                  </h1>
                  {/* <p>{body}</p> */}
                </div>

                <div className="flex-form">
                  <div className="flex-column1">
                    <p>
                      Written By: <span className="flex-text">{author}</span>
                    </p>
                  </div>
                  <br />
                  <div className="flex-column3">
                    <p> | </p>
                  </div>
                  <br />
                  <div className="flex-column2">
                    <p>
                      <img src={clock} alt="" />{" "}
                      <span className="flex-text"> {time}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="post" id="post">
            <div className="container">
              <div className="social-media-sharebtn">
                {/* <h4>Follow</h4> */}
                {/* <ShareSocialButtonC /> */}
              </div>

              <div className="right-post">
                <div className="post-container">
                  {/* <div className='flex-form'>
                  <div className='flex-column1'>
                    <p>
                      <img src='/images/Image6.png' alt='' />
                    </p>
                  </div>

                  <div className='flex-column2'>
                    <p>Written By : {author}</p>
                  </div>
                </div>
                <br /> */}

                  <div className="post-content">
                    <p className="bold">{body}</p>

                    <br />

                    <br />
                    {/* <div className='post-img-1 post-img'></div> */}
                    <br />
                    {/* <p>{body}</p> */}
                    <br />
                    {/* <div className='post-img-2 post-img'></div> */}
                    <br />
                    {/* <p>{body}</p> */}
                    <br />

                    <div className="social-media-sharebtn-1">
                      {/* <h4>Follow</h4> */}
                      {/* <ShareSocialButton /> */}
                    </div>

                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  article: state.article,
});

export default connect(mapStateToProps, { getArticle, clearArticles })(Single);
