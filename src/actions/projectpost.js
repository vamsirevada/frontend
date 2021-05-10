import api from '../utils/api';
import { setAlert } from './alert';
import {
  ADD_PROJECT_POST,
  PROJECT_POST_ERROR,
  GET_PROJECT_POSTS,
  GET_MEMBER_POSTS,
  GET_PROJECT_POST,
  DELETE_PROJECT_POST,
  UPDATE_PROJECT_LIKES,
  ADD_PROJECT_COMMENT,
  REMOVE_PROJECT_COMMENT,
} from './types';

//Create Project Post
export const addProjectPost = (id, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await api.post(`/projectpost/${id}`, formData, config);

    dispatch({
      type: ADD_PROJECT_POST,
      payload: res.data,
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: PROJECT_POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all project posts
export const getProjectPosts = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/projectpost/${id}`);
    dispatch({
      type: GET_PROJECT_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROJECT_POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get members all posts
export const getMemberPosts = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/projectpost/user/${id}`);

    dispatch({
      type: GET_MEMBER_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROJECT_POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Project post
export const getProjectPost = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/projectpost/single/${id}`);

    dispatch({
      type: GET_PROJECT_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROJECT_POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Post
export const deleteProjectPost = (id) => async (dispatch) => {
  try {
    await api.delete(`/projectpost/${id}`);

    dispatch({
      type: DELETE_PROJECT_POST,
      payload: id,
    });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROJECT_POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Project Like
export const addProjectLike = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/projectpost/like/${id}`);

    dispatch({
      type: UPDATE_PROJECT_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: PROJECT_POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove  Like
export const removeProjectLike = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/projectpost/unlike/${id}`);

    dispatch({
      type: UPDATE_PROJECT_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: PROJECT_POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Comment
export const addProjectComment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await api.post(
      `/projectpost/comment/${postId}`,
      formData,
      config
    );
    dispatch({
      type: ADD_PROJECT_COMMENT,
      payload: res.data,
    });
    dispatch(getProjectPost(postId));
    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: PROJECT_POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Comment
export const deleteProjectComment = (postId, commentId) => async (dispatch) => {
  try {
    await api.delete(`/projectpost/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_PROJECT_COMMENT,
      payload: commentId,
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROJECT_POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
