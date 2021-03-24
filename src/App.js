import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import store from './store';
import { Provider } from 'react-redux';
import { loadUser } from './actions/auth';
import Routes from './components/routing/Routes';
import Alert from './components/layout/Alert';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import WriterLogin from './components/auth/WriterLogin';
import WriterRegister from './components/auth/WriterRegister';
import Register from './components/auth/Register';
import Groupregister from './components/auth/Groupregister';
import Forgot from './components/auth/Forgot';
import Reset from './components/auth/Reset';
import Invite from './components/auth/Invite';
import Add from './components/blog/Add';
import Blog from './components/blog/Blog';
import SingleArticle from './components/article/SingleArticle';
import { SearchProvider } from './context/search.provider';
import { ProfileProvider } from './context/profile/profile.provider';
import './App.css';
import ReferralPage from './components/auth/ReferralPage';
import { LOGOUT } from './actions/types';
import Welcome from './Welcome';

const App = () => {
  useEffect(() => {
    // check for token in Local Storage
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all  tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) {
        store.dispatch({
          type: LOGOUT,
        });
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <ProfileProvider>
        <SearchProvider>
          <Router>
            <Fragment>
              <Alert />
              <Switch>
                <Route exact path='/' component={Landing} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/groupregister' component={Groupregister} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/forgot-password' component={Forgot} />
                <Route
                  exact
                  path='/reset-password/:resetPasswordToken'
                  component={Reset}
                />
                <Route exact path='/invite' component={Invite} />
                <Route exact path='/referral' component={ReferralPage} />
                <Route exact path='/writerlogin' component={WriterLogin} />
                <Route
                  exact
                  path='/writerregister'
                  component={WriterRegister}
                />
                <PrivateRoute exact path='/add' component={Add} />
                <Route exact path='/blog' component={Blog} />
                <Route exact path='/blog/:id' component={SingleArticle} />
                <Route exact path='/welcome' component={Welcome} />
                <PrivateRoute component={Routes} />
              </Switch>
            </Fragment>
          </Router>
        </SearchProvider>
      </ProfileProvider>
    </Provider>
  );
};

export default App;
