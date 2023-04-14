// import api from 'api';
import api from '../utils/api';
import { setAlert } from './alert';
import { showLoader } from './application';
import {
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
  GET_PROFILE,
  GET_PROFILE_BY_ID,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  GET_BUDDY_REQUESTS,
  BUDDY_REQUEST_SENT,
  GET_BUDDIES,
  GET_BUDDIES_ERROR,
  BUDDY_REQUEST_DECLINE,
  GET_NOTED_POST,
  GET_NOTED_POST_ERROR,
  GET_NOTED_PEOPLE,
  GET_NOTED_PEOPLE_ERROR,
  PROJECT_INVITE_DECLINED,
  PROJECT_INVITE_ERROR,
} from './types';

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await api.get('/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Send a friend request
export const sendBuddyRequest = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/profile/request/${id}`);
    dispatch({
      type: BUDDY_REQUEST_SENT,
      payload: res.data.msg,
    });
    dispatch(setAlert(' Add Request Sent', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response.data.msg,
    });
    dispatch(setAlert(err.response.data.msg, 'danger'));
  }
};

export const accept = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/profile/buddy/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const decline = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profile/request/${id}`);
    dispatch({
      type: BUDDY_REQUEST_DECLINE,
      payload: res.data.msg,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response.data.msg,
    });
  }
};

export const getBuddyRequests = () => async (dispatch) => {
  try {
    const res = await api.get('api/profile/buddyRequests');
    dispatch({
      type: GET_BUDDY_REQUESTS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

//Note People using profileid
export const notePeople = (id, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await api.put(`/profile/note/${id}`, formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Post Noted succesfully', 'success'));
  } catch (err) {
    dispatch({
      type: GET_NOTED_PEOPLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//unnote People using user id
export const unnotePeople = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profile/unnote/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Unnoted', 'danger'));
    dispatch(getNotedPeople());
  } catch (err) {
    dispatch({
      type: GET_NOTED_PEOPLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//noted people
export const getNotedPeople = () => async (dispatch) => {
  try {
    const res = await api.get('/profile/notedpeople');

    dispatch({
      type: GET_NOTED_PEOPLE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_NOTED_PEOPLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Note Post
export const notePost = (id, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await api.put(`/profile/note/post/${id}`, formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Post Noted succesfully', 'success'));
    dispatch(getNotedPost());
    dispatch(getCurrentProfile());
  } catch (err) {
    dispatch({
      type: GET_NOTED_POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//unnote Post
export const unnotePost = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profile/unnote/post/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('post Unnoted', 'danger'));
    dispatch(getNotedPost());
    dispatch(getCurrentProfile());
  } catch (err) {
    dispatch({
      type: GET_NOTED_POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//noted posts
export const getNotedPost = () => async (dispatch) => {
  try {
    const res = await api.get('/profile/notedpost');

    dispatch({
      type: GET_NOTED_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_NOTED_POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Accept Project Invite
export const acceptProjectInvite = (project_id, status) => async (dispatch) => {
  try {
    const res = await api.put(`/profile/invite/${project_id}`, status);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROJECT_INVITE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Decline Project Invite
export const declineProjectInvite = (project_id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profile/invite/${project_id}`);
    dispatch({
      type: PROJECT_INVITE_DECLINED,
      payload: res.data.msg,
    });
  } catch (err) {
    dispatch({
      type: PROJECT_INVITE_ERROR,
      payload: err.response.data.msg,
    });
  }
};

//get All Profile
export const getProfiles = () => async (dispatch) => {
  try {
    const res = await api.get('/profile');
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getBuddies = () => async (dispatch) => {
  try {
    const res = await api.get('/profile/buddyProfiles');
    dispatch({
      type: GET_BUDDIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_BUDDIES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getBuddiesById = (userId) => async (dispatch) => {
  try {
    const res = await api.get(`/profile/buddyProfiles/${userId}`);
    dispatch({
      type: GET_BUDDIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_BUDDIES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//get Profile by Id
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await api.get(`/profile/user/${userId}`);
    dispatch({
      type: GET_PROFILE_BY_ID,
      payload: res.data,
    });
    dispatch(showLoader());
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Create or Update Profile
export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const res = await api.post('/profile', formData);
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
      );

      if (!edit) {
        history.push('/portfolio');
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// Add Experience
export const addExperience = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await api.put('/profile/experience', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Experience Added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//  Update Experience
export const updateExperience = (id, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/profile/experience/${id}`, formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Experience

export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Experience Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Education
export const addEducation = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await api.put('/profile/education', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Education Added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Education

export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Education Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Awards
export const addAward = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await api.put('/profile/awards', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Award Added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Award

export const deleteAward = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profile/awards/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Award Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Events
export const addEvent = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await api.put('/profile/events', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Event Added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Events

export const deleteEvent = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profile/events/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Event Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Skills
export const addSkills = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await api.put('/profile/skills', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Skill Added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Skills

export const deleteSkills = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profile/skills/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Skill Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Team Members
export const addMembers = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await api.put('/profile/addteam', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Team Member Added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Member

export const deleteMember = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profile/addteam/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Team Member Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add group Skills
export const addSpecialisation = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await api.put('/profile/specialisation', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Specialisation Added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Skills

export const deleteSpecialisation = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profile/specialisation/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Specialisation Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Partner
export const addPartner = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await api.put('/profile/partners', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Partner Added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Partners

export const deletePartner = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profile/partners/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Partner Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Client
export const addClient = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await api.put('/profile/clients', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Client Added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Partners

export const deleteClient = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profile/clients/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Client Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add contact
export const addContact = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await api.put('/profile/contactus', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Successfully Added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete contact

export const deleteContact = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profile/contacts/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Award Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can Not be undone!')) {
    try {
      await api.delete('/profile');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert('Your account has been permanantly deleted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
