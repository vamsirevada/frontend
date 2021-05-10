import React from 'react';
import { Switch } from 'react-router-dom';
import Portfolio from '../portfolio/Portfolio';
import Portfolio1 from '../portfolio/Portfolio1';
import CreateProject from '../project-forms/CreateProject';
import EditProfile from '../profile-forms/EditProfile';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import AddEvents from '../profile-forms/AddEvents';
import AddSkills from '../profile-forms/AddSkills';
import AddAward from '../profile-forms/AddAward';
import Profiles from '../profiles/Profiles';
import Profile2 from '../profile/Profile2';
import Profile from '../profile/Profile';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import ProjectPost from '../projectposts/ProjectPost';
import Feed from '../feed/Feed';
import Navbar from '../layout/Navbar';
import Friends from '../profiles/Friends';
import Friends1 from '../profiles/Friends1';
import Projects from '../profiles/Projects';
import AddPortfolio from '../addportfolio/AddPortfolio';
import PrivateRoute from './PrivateRoute';
import ChatPage from '../chat/ChatPage';
import SingleProject from '../projects/SingleProject';
import ProjectList from '../projects/ProjectList';
import SingleNotice from '../projects/SingleNotice';
import NoticeBoard from '../projects/NoticeBoard';
import Loader from '../layout/Loader';
import WelcomeScreen from '../layout/WelcomeScreen';
import WelcomeRscreen from '../layout/WelcomeRscreen';
import Finance from '../Finance/Finance';

const Routes = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <PrivateRoute exact path='/loader' component={Loader} />
        <PrivateRoute exact path='/welcomescreen' component={WelcomeScreen} />
        <PrivateRoute exact path='/welcomeRscreen' component={WelcomeRscreen} />
        <PrivateRoute exact path='/portfolio' component={Portfolio} />
        <PrivateRoute exact path='/portfolio/:id' component={Portfolio1} />
        <PrivateRoute exact path='/noticeboard' component={NoticeBoard} />
        <PrivateRoute exact path='/addfiles' component={AddPortfolio} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/profile' component={Profile2} />
        <PrivateRoute exact path='/profile/:id' component={Profile} />
        <PrivateRoute exact path='/profiles' component={Profiles} />
        <PrivateRoute exact path='/create-project' component={CreateProject} />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />
        <PrivateRoute exact path='/add-award' component={AddAward} />
        <PrivateRoute exact path='/add-events' component={AddEvents} />
        <PrivateRoute exact path='/add-skills' component={AddSkills} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/posts/:id' component={Post} />
        <PrivateRoute
          exact
          path='/project/:id/posts/:post_id'
          component={ProjectPost}
        />
        <PrivateRoute exact path='/project/:id' component={SingleProject} />
        <PrivateRoute
          exact
          path='/:project_id/notice/:id'
          component={SingleNotice}
        />
        <PrivateRoute exact path='/feed' component={Feed} />
        <PrivateRoute exact path='/friends' component={Friends} />
        <PrivateRoute exact path='/chats' component={ChatPage} />
        <PrivateRoute exact path='/friends/:id' component={Friends1} />
        <PrivateRoute exact path='/projects/:id' component={Projects} />
        <PrivateRoute exact path='/projectlist/:id' component={ProjectList} />
        <PrivateRoute exact path='/projectfinance/:id' component={Finance} />
      </Switch>
    </>
  );
};

export default Routes;
