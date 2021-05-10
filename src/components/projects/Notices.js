import React, { useState, useEffect } from 'react';
import close from '../../images/icons/noun_Plus_2310779.svg';
import logo from '../../images/Article-1b.png';
import { createNotice, getNotices } from '../../actions/notice';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { projectStorage } from '../../firebase/config';
import plus from '../../images/icons/noun_Plus_2310779.svg';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Notices = ({
  id,
  singleproject,
  userId,
  createNotice,
  getNotices,
  notice: { notices },
}) => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [viewall, setViewAll] = useState(false);
  let fileInput = React.createRef();

  useEffect(() => {
    getNotices(id);
  }, [getNotices, id]);

  const [formData, setFormData] = useState({
    title: '',
    noticeImg: '',
    deadline: '',
    eligibility: '',
    description: '',
    venue: '',
    role: '',
  });

  const {
    title,
    noticeImg,
    deadline,
    eligibility,
    description,
    venue,
    role,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onOpenFileDialog = () => {
    fileInput.current.click();
  };

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = projectStorage.ref('noticeboardpictures');
    const fileRef = storageRef.child(file.name).put(file);
    fileRef.on(
      'state_changed',
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(Math.round(percentage));
        setOpen(true);
      },
      (error) => {
        console.log(error);
      },
      () => {
        fileRef.snapshot.ref.getDownloadURL().then((url) => {
          setFormData({
            ...formData,
            noticeImg: url,
          });
          setOpen(false);
        });
      }
    );
  };

  const isAdmin =
    singleproject?.admin &&
    singleproject?.admin.map((x) => x?.user === userId).find((x) => x === true);

  const isModerator =
    singleproject?.moderator &&
    singleproject?.moderator
      .map((x) => x?.user === userId)
      .find((x) => x === true);

  const onSubmit = (e) => {
    e.preventDefault();
    createNotice({ id, formData });
    setShow(false);
  };

  return (
    <>
      <div className='notice-main'>
        <div className='notice-main-container'>
          <div className='notice-main-heading'>
            <h2>Notices</h2>
            <p
              onClick={() => {
                setViewAll(!viewall);
              }}
            >
              View All
            </p>
          </div>
          <hr className='Hori' />

          {notices &&
            notices
              .slice(0, viewall ? notices.length : 3)
              .map((notice, index) => (
                <div key={index} className='notice-item'>
                  <Link
                    to={
                      isAdmin || isModerator
                        ? `/${singleproject?._id}/notice/${notice?._id}`
                        : '#!'
                    }
                  >
                    <img
                      src={notice?.noticeImg ? notice?.noticeImg : logo}
                      alt=''
                    />
                    <div className='notice-item-body'>
                      <h3>{notice?.title}</h3>
                      <div className='notice-flex'>
                        <p>
                          Posted{': '}
                          <span className='notice-flex-date'>
                            <Moment format='DD MMM YY'>{notice?.date}</Moment>
                          </span>
                        </p>
                        <p>
                          Deadline{': '}
                          <span className='notice-flex-date'>
                            <Moment format='DD MMM YY'>
                              {notice?.deadline}
                            </Moment>
                          </span>
                        </p>
                      </div>
                      <div className='notice-body-postedby'>
                        <p>
                          Posted by:{' '}
                          <span
                            style={{
                              color: '#7480FC',
                            }}
                            className='notice-postedby-name'
                          >
                            {notice?.project?.projectname}
                          </span>
                        </p>
                      </div>
                      <div className='notice-members-appshort'>
                        <p>
                          <span>{notice?.applied.length} members applied</span>
                        </p>
                        <p>
                          <span>
                            {notice?.shortlisted.length} members shortlisted
                          </span>
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
        </div>
      </div>
      {isAdmin || isModerator ? (
        <div className='notice-publish'>
          <a href='#!' onClick={() => setShow(true)}>
            <span className='nbtn-yellow'>
              <img src={plus} alt='' />
            </span>
            <span className='publish-text'>Publish new notice</span>
          </a>
        </div>
      ) : null}

      {show && (
        <>
          <div className='noticepopupscreen'>
            <div className='noticepopup'>
              <div className='notice-heading'>
                <h2>Create Notice</h2>
                <a
                  href='#!'
                  className='notice-cross'
                  onClick={() => setShow(false)}
                >
                  <img src={close} alt='' />
                </a>
              </div>
              <div className='notice-dp'>
                <input
                  type='file'
                  onChange={onFileChange}
                  hidden={true}
                  ref={fileInput}
                />
                <div>
                  <img
                    onClick={onOpenFileDialog}
                    className='display-pic'
                    src={noticeImg ? noticeImg : logo}
                    alt=''
                  />
                </div>
                {open ? (
                  <div style={{ width: 50, height: 50, margin: 'auto' }}>
                    <CircularProgressbar
                      value={progress}
                      text={`${progress}%`}
                    />
                  </div>
                ) : (
                  <p>Add a Picture</p>
                )}
              </div>
              <div className='n-form notice'>
                <form onSubmit={(e) => onSubmit(e)}>
                  <div>
                    <label className='form-label'>
                      Title <span className='blue'>*</span>
                    </label>
                    <br />
                    <input
                      className='notice-form-input'
                      type='text'
                      name='title'
                      value={title}
                      onChange={(e) => onChange(e)}
                      placeholder='Enter Notice Title'
                      required
                    />
                  </div>
                  <div>
                    <label className='form-label'>
                      Deadline <span className='blue'>*</span>
                    </label>
                    <br />
                    <input
                      className='notice-form-input'
                      type='date'
                      name='deadline'
                      value={deadline}
                      onChange={(e) => onChange(e)}
                      placeholder='Enter Notice Deadline'
                      required
                    />
                  </div>
                  <div>
                    <label className='form-label'>
                      Eligibility <span className='blue'>*</span>
                    </label>
                    <br />
                    <input
                      className='notice-form-input'
                      type='text'
                      name='eligibility'
                      value={eligibility}
                      onChange={(e) => onChange(e)}
                      placeholder='Enter Eligibility'
                      required
                    />
                  </div>
                  <div>
                    <label className='form-label'>Venue </label>
                    <br />
                    <input
                      className='notice-form-input'
                      type='text'
                      name='venue'
                      value={venue}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div>
                    <label className='form-label'>Description</label>
                    <br />
                    <textarea
                      className='notice-form-input'
                      name='description'
                      id='messages'
                      rows='4'
                      value={description}
                      onChange={(e) => onChange(e)}
                      placeholder='Write Something about project'
                      required
                    ></textarea>
                  </div>
                  <div>
                    <label className='form-label'>Required Role</label>
                    <br />
                    <input
                      className='notice-form-input'
                      type='text'
                      name='role'
                      value={role}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className='noticebuttons'>
                    <button type='Submit' className='notice-save'>
                      {' '}
                      Save
                    </button>
                    <button
                      className='notice-cancel'
                      onClick={() => setShow(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  notice: state.notice,
});

export default connect(mapStateToProps, { createNotice, getNotices })(Notices);
