import React, { Fragment, useEffect } from 'react';
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
  // const [own, setOwn] = useState(false);

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
      {/* {own ? (
        <Fragment>
          <div className='posts'>
            {oprojectposts.map((post) => (
              <ProjectPostItem
                singleproject={singleproject}
                profile={profile}
                key={post._id}
                post={post}
              />
            ))}
          </div>
        </Fragment>
      ) : ( */}
      <Fragment>
        <div className='posts'>
          {projectposts.map((post) => (
            <ProjectPostItem
              singleproject={singleproject}
              profile={profile}
              key={post._id}
              post={post}
            />
          ))}
        </div>
      </Fragment>
      {/* )} */}
    </>
  );
};

const mapStateToProps = (state) => ({
  projectpost: state.projectpost,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProjectPosts, getMemberPosts })(
  ProjectPosts
);
