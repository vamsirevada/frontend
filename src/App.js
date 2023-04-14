import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ShepherdTour } from 'react-shepherd';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import store from './store';
import { Provider } from 'react-redux';
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
import CreateGroupProfile from './components/profile-forms/CreateGroupProfile';
import SingleArticle from './components/article/SingleArticle';
import CreateProfile from './components/profile-forms/Createprofile';
import Help from './components/about/Help';
// import NotFound from './components/NotFound';
import ReferralPage from './components/auth/ReferralPage';
import './App.css';
import { LOGOUT } from './actions/types';
import AOS from 'aos';
import 'aos/dist/aos.css';
import steps from './steps';
import './steps.css';
import Portfolio2 from '../src/components/portfolio/Portfolio2';
import TermsAndConditions from './components/auth/TermsAndConditions';
import NewModal from './components/addportfolio/NewModal';

const tourOptions = {
  defaultStepOptions: {
    cancelIcon: {
      enabled: true,
    },
  },
  useModalOverlay: true,
};

const App = () => {
  useEffect(() => {
    // check for token in Local Storage
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    // log user out from all  tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });

    AOS.init();
  }, []);

  return (
    <Provider store={store}>
      <ShepherdTour steps={steps} tourOptions={tourOptions}>
        <Router>
          <Fragment>
            <Alert />
            <Switch>
              {/* <Route exact path='/' component={NotFound} /> */}
              <Route exact path='/' component={Landing} />
              <Route exact path='/help' component={Help} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/groupregister' component={Groupregister} />
              <Route exact path='/privacy' component={TermsAndConditions} />
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
              <Route exact path='/writerregister' component={WriterRegister} />
              <PrivateRoute exact path='/add' component={Add} />
              <Route exact path='/blog' component={Blog} />
              <Route exact path='/blog/:id' component={SingleArticle} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path='/create-group-profile'
                component={CreateGroupProfile}
              />
              <Route exact path='/portfolio/guest/:id' component={Portfolio2} />
              <Route
                exact
                path='/portfolio/:id/view/:docid'
                component={NewModal}
              />
              <PrivateRoute component={Routes} />
            </Switch>
          </Fragment>
        </Router>
      </ShepherdTour>
    </Provider>
  );
};

export default App;
