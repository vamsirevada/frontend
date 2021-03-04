import React, { useState, useEffect } from 'react';
import close from '../../images/icons/noun_Plus_2310779.svg';
import logo from '../../images/Article-1b.png';
import { createNotice, getNotices } from '../../actions/notice';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { projectStorage } from '../../firebase/config';

const Notices = ({
  id,
  creator,
  createNotice,
  getNotices,
  notice: { notices },
}) => {
  const [show, setShow] = useState(false);
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
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFormData({
      ...formData,
      noticeImg: await fileRef.getDownloadURL(),
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createNotice({ id, formData });
    setShow(false);
  };

  return (
    <div>
      <span>
        <h1>Notices</h1>
        <span
          onClick={() => {
            setViewAll(!viewall);
          }}
          style={{ color: '#5d67cc', cursor: 'pointer', float: 'right' }}
        >
          View All
        </span>
      </span>

      {notices &&
        notices.slice(0, viewall ? notices.length : 3).map((notice, index) => (
          <div style={{ height: '330px', width: '336px' }} key={index}>
            <Link to={`/project/${id}/notice/${notice?._id}`}>
              <img
                height='132px'
                width='336px'
                src={notice?.noticeImg ? notice?.noticeImg : logo}
                alt=''
              />
              <div>
                <h3>{notice?.title}</h3>
                <span>
                  <small>
                    Posted{': '}
                    <Moment format='DD MMMM, YYYY'>{notice?.date}</Moment>
                  </small>
                  <small style={{ float: 'right' }}>
                    Deadline{': '}
                    <Moment format='DD MMMM, YYYY'>{notice?.deadline}</Moment>
                  </small>
                </span>
                <div>
                  <h4>
                    Posted by:{' '}
                    <p
                      style={{ color: '#7480FC', textDecoration: 'underline' }}
                    >
                      {creator}
                    </p>
                  </h4>
                </div>
              </div>
            </Link>
          </div>
        ))}
      <button onClick={() => setShow(true)}>Publish new notice</button>
      {show && (
        <>
          <div className='noticepopupscreen'>
            <div className='noticepopup'>
              <div className='notice-heading'>
                <h1>Create Notice</h1>
                <a
                  href='#!'
                  className='notice-cross'
                  onClick={() => setShow(false)}
                >
                  <img src={close} alt='' />
                </a>
              </div>
              <div>
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
                <p>Add a Picture</p>
              </div>
              <div className='n-form notice'>
                <form onSubmit={(e) => onSubmit(e)}>
                  <div>
                    <label>
                      Title <span className='blue'>*</span>
                    </label>
                    <input
                      type='text'
                      name='title'
                      value={title}
                      onChange={(e) => onChange(e)}
                      placeholder='Enter Notice Title'
                      required
                    />
                  </div>
                  <div>
                    <label>
                      Deadline <span className='blue'>*</span>
                    </label>
                    <input
                      type='date'
                      name='deadline'
                      // id='location'
                      value={deadline}
                      onChange={(e) => onChange(e)}
                      placeholder='Enter Notice Deadline'
                      required
                    />
                  </div>
                  <div>
                    <label>
                      Eligibility <span className='blue'>*</span>
                    </label>
                    <input
                      type='text'
                      name='eligibility'
                      // id='location'
                      value={eligibility}
                      onChange={(e) => onChange(e)}
                      placeholder='Enter Eligibility'
                      required
                    />
                  </div>
                  <div>
                    <label>Venue </label>
                    <input
                      type='text'
                      name='venue'
                      value={venue}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div>
                    <label>Description</label>
                    <textarea
                      name='description'
                      id='messages'
                      rows='8'
                      value={description}
                      onChange={(e) => onChange(e)}
                      placeholder='Write Something about project'
                      required
                    ></textarea>
                  </div>
                  <div>
                    <label>Required Role</label>
                    <input
                      type='text'
                      name='role'
                      value={role}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <br />
                  <button type='Submit'> Save</button>
                  <button>Cancel</button>
                  <br />
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  notice: state.notice,
});

export default connect(mapStateToProps, { createNotice, getNotices })(Notices);
