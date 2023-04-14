import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { getRealtimeData } from '../../actions/portfolio';
import Loader from '../layout/Loader';
import logo from '../../images/dummyimage.jpg';
import backward from '../../images/Group 6054.svg';
import forward from '../../images/Group 6056.svg';
import poster from '../../images/poster.png';
import closebutton from '../../images/close.svg';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { projectFirestore } from '../../firebase/config';
import Moment from 'react-moment';
import UseFirestore from './UseFireStore';
import ModalBottom from './ModalBottom';
import { Fragment } from 'react';

const NewModal = ({ auth, guest, portfolio: { portfolio } }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const { docs } = UseFirestore('images');
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    titleedit: false,
    ptitle: '',
  });

  useEffect(() => {
    dispatch(getRealtimeData(params.docid));
    const t = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => {
      clearTimeout(t);
    };
  }, [dispatch, params, history]);

  const docIds =
    docs &&
    docs
      .filter((i) => i.userId === params.id && i.type === portfolio.type)
      .map((doc) => doc.id);

  const docIndex = docIds.indexOf(portfolio.id);

  const goForward = () => {
    let increment = docIndex + 1;
    if (increment > docIds.length - 1) {
      increment = 0;
    }
    history.push(`/portfolio/${params.id}/view/${docIds[increment]}`);
    dispatch(getRealtimeData(docIds[increment]));
    setLoading(true);
    setState({
      titleedit: false,
    });
  };

  const goBackward = () => {
    let decrement = docIndex - 1;
    if (decrement < 0) {
      decrement = docIds.length - 1;
    }
    history.push(`/portfolio/${params.id}/view/${docIds[decrement]}`);
    dispatch(getRealtimeData(docIds[decrement]));
    setLoading(true);
    setState({
      titleedit: false,
    });
  };

  const updateTitle = () => {
    projectFirestore.collection('images').doc(portfolio.id).update({
      title: state.ptitle,
    });
    setState({
      ...state,
      titleedit: false,
    });
    dispatch(getRealtimeData(portfolio.id));
  };

  const hideModal = () => {
    history.push(localStorage.getItem('location'));
  };

  return (
    <Fragment>
      {loading ? (
        <div className='post-pop-up'>
          <Loader />
        </div>
      ) : (
        <div className='post-pop-up'>
          <div className='post-pop-up-container'>
            <div>
              <div className='flex'>
                <div className='flex-left'>
                  <div className='flex-1'>
                    <div
                      style={{
                        background: `url(${
                          portfolio.userAvatar ? portfolio.userAvatar : logo
                        }) no-repeat center center/cover`,
                      }}
                      className='display-pic'
                    ></div>
                    <div className='lh-title'>
                      {state.titleedit ? (
                        <div className='popup-title'>
                          <input
                            type='text'
                            defaultValue={portfolio.title}
                            onChange={(e) =>
                              setState({
                                ...state,
                                ptitle: e.target.value,
                              })
                            }
                          />
                          <div className='popup-editbutton'>
                            <div onClick={updateTitle}>
                              <CheckIcon color='primary' />
                            </div>
                            <div
                              onClick={() =>
                                setState({
                                  ...state,
                                  titleedit: false,
                                })
                              }
                            >
                              <CloseIcon color='secondary' />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className='popup-title'>
                          <h2 className='modal-title w-100'>
                            {portfolio.title}
                          </h2>
                          {auth.user._id === portfolio.userId && (
                            <div
                              onClick={() =>
                                setState({
                                  ...state,
                                  titleedit: true,
                                })
                              }
                            >
                              <EditIcon className='edit-icon' />
                            </div>
                          )}
                        </div>
                      )}
                      <p>
                        by <span className='blue'>{portfolio.userName}</span>
                        {', '}
                        <Moment className='date' format='DD MMM YY'>
                          {portfolio.createdAt && portfolio.createdAt.toDate()}
                        </Moment>{' '}
                        {', '}
                        <Moment className='date' format='hh:mm A'>
                          {portfolio.createdAt && portfolio.createdAt.toDate()}
                        </Moment>
                      </p>
                    </div>
                  </div>
                </div>
                <div onClick={hideModal} className='flex-right'>
                  <img src={closebutton} alt='' />
                </div>
              </div>
              <hr className='hori' />
            </div>

            <div className='main-post-container'>
              <div className='main-post-top'>
                <div onClick={goBackward} className='prev prev-1'>
                  <img src={backward} alt='' />
                </div>
                <div className='post-pic-1'>
                  {portfolio.type === 'Picture' && (
                    <img src={portfolio.url} alt='' />
                  )}
                  {portfolio.type === 'Video' && (
                    <video
                      controls
                      controlsList='nodownload'
                      className='post-pic-1-video'
                      src={portfolio.url}
                    ></video>
                  )}
                  {portfolio.type === 'Audio' && (
                    <video
                      src={portfolio.url}
                      controls
                      controlsList='nodownload'
                      poster={poster}
                      alt=''
                    ></video>
                  )}
                </div>
                <div onClick={goForward} className='prev prev-2'>
                  <img src={forward} alt='' />
                </div>
              </div>
              <ModalBottom auth={auth} portfolio={portfolio} />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  portfolio: state.portfolio,
});

export default connect(mapStateToProps)(NewModal);
