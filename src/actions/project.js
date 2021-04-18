import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_PROJECTS,
  GET_PROJECT,
  GET_PROJECT_BUDGET,
  PROJECT_INVITE_SENT,
  PROJECT_INVITE_CANCEL,
  CREATE_PROJECT,
  UPDATE_PROJECT,
  PROJECT_ERROR,
  DELETE_PROJECT,
  DELETE_PROJECT_BUDGET,
} from './types';

// Get all projects of user using user id
export const getProjects = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/project/${id}`);
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
    const res = await api.get(`/project/single/${id}`);
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
    const res = await api.post(`/project`, formData, config);
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

export const addBudget = (id, budgetObj) => async (dispatch) => {
  console.log(budgetObj);

  try {
    const res = await api.post(`/project/${id}/budget`, budgetObj);

    dispatch({
      type: UPDATE_PROJECT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: err.response.data.msg,
    });
    dispatch(setAlert(err.response.data.msg, 'danger'));
  }
};

export const getProjectBudget = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/project/${id}/budget`);
    dispatch({
      type: GET_PROJECT_BUDGET,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: err.response.data.msg,
    });
    dispatch(setAlert(err.response.data.msg, 'danger'));
  }
};

export const deleteBudget = (id, budget_id) => async (dispatch) => {
  try {
    const res = await api.delete(`/project/${id}/budget/${budget_id}`);
    dispatch({
      type: DELETE_PROJECT_BUDGET,
      payload: res.data.msg,
    });
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: err.response.data.msg,
    });

    dispatch(setAlert(err.response.data.msg, 'danger'));
  }
};

//Send a Project Invite
export const sendProjectInvite = (project_id, profile_id) => async (
  dispatch
) => {
  try {
    const res = await api.put(`/project/invites/${project_id}/${profile_id}`);
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

//Cancel Project Invite
export const cancelProjectInvite = (project_id, profile_id) => async (
  dispatch
) => {
  try {
    const res = await api.delete(
      `/project/invites/${project_id}/${profile_id}`
    );
    dispatch({
      type: PROJECT_INVITE_CANCEL,
      payload: res.data.msg,
    });
    dispatch(setAlert(' Project Invite Cancelled', 'success'));
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: err.response.data.msg,
    });

    dispatch(setAlert(err.response.data.msg, 'danger'));
  }
};

// Make Admin
export const makeAdmin = (project_id, user_id) => async (dispatch) => {
  try {
    const res = await api.post(`/project/admin/${project_id}/${user_id}`);
    dispatch({
      type: UPDATE_PROJECT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: err.response.data.msg,
    });
    dispatch(setAlert(err.response.data.msg, 'danger'));
  }
};

// Remove Admin
export const removeAdmin = (project_id, user_id) => async (dispatch) => {
  try {
    const res = await api.delete(`/project/admin/d/${project_id}/${user_id}`);
    dispatch({
      type: UPDATE_PROJECT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: err.response.data.msg,
    });
    dispatch(setAlert(err.response.data.msg, 'danger'));
  }
};

// Make Moderator
export const makeModerator = (project_id, user_id) => async (dispatch) => {
  try {
    const res = await api.post(`/project/moderator/${project_id}/${user_id}`);
    dispatch({
      type: UPDATE_PROJECT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: err.response.data.msg,
    });
    dispatch(setAlert(err.response.data.msg, 'danger'));
  }
};

// Remove Moderator
export const removeModerator = (project_id, user_id) => async (dispatch) => {
  try {
    const res = await api.delete(
      `/project/moderator/d/${project_id}/${user_id}`
    );
    dispatch({
      type: UPDATE_PROJECT,
      payload: res.data,
    });
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
    await api.delete(`/project/${id}`);

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
