import api from '../utils/api';
import { setAlert } from './alert';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  WRITER_REGISTER_SUCCESS,
  WRITER_LOGIN_SUCCESS,
  WRITER_LOGIN_FAIL,
  WRITER_REGISTER_FAIL,
  USER_LOADED,
  WRITER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REFERRAL_SUCESS,
  GROUP_REGISTER_SUCCESS,
} from './types';

export const isAuthenticated = () => {
  if (typeof window == 'undefined') {
    return false;
  }

  if (localStorage.getItem('token')) {
    return JSON.parse(localStorage.getItem('token'));
  } else {
    return false;
  }
};

//Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const loadWriter = () => async (dispatch) => {
  try {
    const res = await api.get('/auth/writer');
    dispatch({
      type: WRITER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Register User
export const register = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/users', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//Login User
export const login = (email, password) => async (dispatch) => {
  const body = { email, password };
  try {
    const res = await api.post('/auth', body);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
// Writer Login
export const loginWriter = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await api.post('/auth/writer', body, config);

    dispatch({
      type: WRITER_LOGIN_SUCCESS,
      payload: res.data,
    });

    // dispatch(loadWriter());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: WRITER_LOGIN_FAIL,
    });
  }
};

//Register groupUser
export const groupRegister =
  ({
    groupName,
    userName,
    email,
    password,
    isGroup,
    userpermission,
    // code,
  }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({
      groupName,
      userName,
      email,
      password,
      isGroup,
      userpermission,
      // code,
    });

    try {
      const res = await api.post('/users/group', body, config);

      dispatch({
        type: GROUP_REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

//Register writer
export const writerRegister =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({
      name,
      email,
      password,
    });

    try {
      const res = await api.post('/users/writer', body, config);

      dispatch({
        type: WRITER_REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
        type: WRITER_REGISTER_FAIL,
      });
    }
  };

export const sendInvite =
  ({ email }) =>
  async (dispatch) => {
    const body = JSON.stringify({
      email: email,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await api.post('/auth/send-invite', body, config);

      dispatch({
        type: REFERRAL_SUCESS,
        payload: res.data.message,
      });
      dispatch(setAlert(res.data.message, 'success'));
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

export const sendReferral =
  ({ email }) =>
  async (dispatch) => {
    const body = JSON.stringify({
      email: email,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await api.post('/auth/send-referral', body, config);

      dispatch({
        type: REFERRAL_SUCESS,
        payload: res.data.message,
      });
      dispatch(setAlert(res.data.message, 'success'));
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

export const logout = () => async (dispatch) => {
  try {
    const res = await api.get('/auth/signout');
    dispatch({
      type: LOGOUT,
      payload: res.data.message,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// export const logout = () => async (dispatch) => {
//   dispatch({ type: LOGOUT });
// };
