import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getProjectPosts, getMemberPosts } from '../../actions/projectpost';
import ProjectPostItem from './ProjectPostItem';

const ProjectPosts = ({
  profile,
  singleproject,
  getProjectPosts,
  getMemberPosts,
  id,
  projectpost: { projectposts, oprojectposts, loading },
}) => {
  console.log(id);
  const [own, setOwn] = useState(false);

  useEffect(() => {
    getProjectPosts(id);

    getMemberPosts(id);
    //eslint-disable-next-line
  }, [getProjectPosts, getMemberPosts]);

  return (
    <>
      {/* <button
        onClick={() => {
          setOwn(true);
        }}
      >
        Sort
      </button> */}
      {own ? (
        <Fragment>
          <div className='posts'>
            {oprojectposts.map((post) => (
              <ProjectPostItem profile={profile} key={post._id} post={post} />
            ))}
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className='posts'>
            {projectposts.map((post) => (
              <ProjectPostItem profile={profile} key={post._id} post={post} />
            ))}
          </div>
        </Fragment>
      )}
    </>
  );
};

// ProjectPosts.propTypes = {
//   post: PropTypes.object.isRequired,
//   profile: PropTypes.object.isRequired,
// };

const mapStateToProps = (state) => ({
  projectpost: state.projectpost,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProjectPosts, getMemberPosts })(
  ProjectPosts
);
