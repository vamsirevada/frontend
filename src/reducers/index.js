import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import article from './article';
import chat from './chat';
import notification from './notification';
import project from './project';
import notice from './notice';
import projectpost from './projectpost';
import portfolio from './portfolio';
import expense from './expense';
import application from './application';

export default combineReducers({
  application,
  alert,
  auth,
  profile,
  post,
  article,
  chat,
  notification,
  project,
  notice,
  projectpost,
  portfolio,
  expense,
});
