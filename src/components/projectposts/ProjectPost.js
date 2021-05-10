import React, { useEffect } from 'react';
import { getProjectPost } from '../../actions/projectpost';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../layout/Loader';
import ProjectPostItem from './ProjectPostItem';

const ProjectPost = ({
  getProjectPost,
  projectpost: { projectpost, loading },
  match,
}) => {
  useEffect(() => {
    getProjectPost(match.params.post_id);
  }, [getProjectPost, match.params.post_id]);

  return loading || projectpost === null ? (
    <Loader />
  ) : (
    <>
      <div id='feed'>
        <div className='left'>
          <div>
            <Link to={`/project/${match.params.id}`} className='btn-yellow'>
              Back
            </Link>
          </div>
        </div>
        <div className='center'>
          <div id='feed-main'>
            <div className='feed-main-container'>
              <ProjectPostItem
                params={true}
                key={projectpost._id}
                post={projectpost}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  projectpost: state.projectpost,
});

export default connect(mapStateToProps, {
  getProjectPost,
})(ProjectPost);
