import api from './api';
import store from '../store';
import { loadUser } from '../actions/auth';
import { getCurrentProfile } from '../actions/profile';

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('token', token);
    store.dispatch(loadUser());
    store.dispatch(getCurrentProfile());
  } else {
    delete api.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
  }
};

export default setAuthToken;
