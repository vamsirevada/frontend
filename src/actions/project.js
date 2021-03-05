import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PROJECTS,
  GET_PROJECT,
  PROJECT_INVITE_SENT,
  CREATE_PROJECT,
  PROJECT_ERROR,
  DELETE_PROJECT,
} from './types';

// Get all projects of user using user id
export const getProjects = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/project/${id}`);
    dispatch({
      type: GET_PROJECTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get specific project by project id
export const getProject = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/project/single/${id}`);
    dispatch({
      type: GET_PROJECT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Create Project
export const createProject = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(`/api/project`, formData, config);
    dispatch({
      type: CREATE_PROJECT,
      payload: res.data,
    });
    dispatch(setAlert('Project Created', 'success'));
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//Send a Project Invite
export const sendProjectInvite = (project_id, profile_id) => async (
  dispatch
) => {
  try {
    const res = await axios.put(
      `/api/project/invites/${project_id}/${profile_id}`
    );
    dispatch({
      type: PROJECT_INVITE_SENT,
      payload: res.data.msg,
    });
    dispatch(setAlert(' Project Invite Sent', 'success'));
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: err.response.data.msg,
    });

    dispatch(setAlert(err.response.data.msg, 'danger'));
  }
};

//Delete Project By project Id
export const deleteProject = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/project/${id}`);

    dispatch({
      type: DELETE_PROJECT,
      payload: id,
    });

    dispatch(setAlert('Project Deleted', 'success'));
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
