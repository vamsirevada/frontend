import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import article from './article';
import chat from './chat';
import notification from './notification';
import project from './project';

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  article,
  chat,
  notification,
  project,
});
