import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_NOTICES,
  GET_NOTICE,
  CREATE_NOTICE,
  NOTICE_ERROR,
  DELETE_NOTICE,
  UPDATE_NOTICE,
  GET_APPLIED_MEMBERS,
  GET_SHORTLISTED_MEMBERS,
} from './types';

// Get all notices

export const getAllNotices = () => async (dispatch) => {
  try {
    const res = await api.get('/notice/all');
    dispatch({
      type: GET_NOTICES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NOTICE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all notices of user using user id

export const getNoticesByUser = () => async (dispatch) => {
  try {
    const res = await api.get('/notice');
    dispatch({
      type: GET_NOTICES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NOTICE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all notices of user using project id

export const getNotices = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/notice/${id}`);
    dispatch({
      type: GET_NOTICES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NOTICE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get specific notice by notice id
export const getNotice = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/notice/single/${id}`);
    dispatch({
      type: GET_NOTICE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NOTICE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create Notice
export const createNotice = ({ id, formData }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await api.post(`/notice/${id}`, formData, config);

    dispatch({
      type: CREATE_NOTICE,
      payload: res.data,
    });
    dispatch(setAlert('Notice Created', 'success'));
  } catch (err) {
    dispatch({
      type: NOTICE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Apply to Notice using Notice Id
export const applyNotice = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/notice/apply/${id}`);

    dispatch({
      type: UPDATE_NOTICE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NOTICE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Shortlist to Notice using Notice Id
export const shortlistNotice = (id, profileId) => async (dispatch) => {
  try {
    const res = await api.put(`/notice/shortlist/${id}/${profileId}`);

    dispatch({
      type: UPDATE_NOTICE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NOTICE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get applied member Profiles using Notice Id
export const getAppliedMembers = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/notice/applied/${id}`);

    dispatch({
      type: GET_APPLIED_MEMBERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NOTICE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get shortlisted member Profiles using Notice Id

export const getShortlistedMembers = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/notice/shortlisted/${id}`);

    dispatch({
      type: GET_SHORTLISTED_MEMBERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NOTICE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Project By project Id
export const deleteProject = (id) => async (dispatch) => {
  try {
    await api.delete(`/notice/${id}`);

    dispatch({
      type: DELETE_NOTICE,
      payload: id,
    });

    dispatch(setAlert('Project Deleted', 'success'));
  } catch (err) {
    dispatch({
      type: NOTICE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
