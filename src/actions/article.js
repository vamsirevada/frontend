import axios from 'axios';
import { setAlert } from './alert';
import {
  ADD_ARTICLE,
  GET_ARTICLES,
  GET_ARTICLE,
  CLEAR_ARTICLES,
  ARTICLE_ERROR,
  FILTER_ARTICLES,
  CLEAR_FILTER,
} from '../actions/types';

//Get Articles
export const getArticles = () => async (dispatch) => {
  try {
    const res = await axios.get('api/article');

    dispatch({ type: GET_ARTICLES, payload: res.data });
  } catch (err) {
    dispatch({ type: ARTICLE_ERROR, payload: err.response.msg });
  }
};

//Get single Article
export const getArticle = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/article/${id}`);

    dispatch({ type: GET_ARTICLE, payload: res.data });
  } catch (err) {
    dispatch({ type: ARTICLE_ERROR, payload: err.response.msg });
  }
};

//Add Article
export const addArticle = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(`/api/article`, formData, config);
    console.log(formData);

    dispatch({
      type: ADD_ARTICLE,
      payload: res.data,
    });
    dispatch(setAlert('New Article Created', 'success'));
  } catch (err) {
    dispatch({
      type: ARTICLE_ERROR,
      payload: err.response,
    });
  }
};

//Update Post

//Delete Post

// Clear Articles
export const clearArticles = () => async (dispatch) => {
  dispatch({ type: CLEAR_ARTICLES });
};

//Filter Post
export const filterArticle = (text) => async (dispatch) => {
  dispatch({ type: FILTER_ARTICLES, payload: text });
};

//Clear filter
export const clearFilter = () => async (dispatch) => {
  dispatch({ type: CLEAR_FILTER });
};
