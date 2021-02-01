import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Portfolio from "../portfolio/Portfolio";
import Portfolio1 from "../portfolio/Portfolio1";
import CreateProfile from "../profile-forms/Createprofile";
import CreateGroupProfile from "../profile-forms/CreateGroupProfile";
import EditProfile from "../profile-forms/EditProfile";
import AddExperience from "../profile-forms/AddExperience";
import AddEducation from "../profile-forms/AddEducation";
import AddEvents from "../profile-forms/AddEvents";
import AddSkills from "../profile-forms/AddSkills";
import AddAward from "../profile-forms/AddAward";
import Profiles from "../profiles/Profiles";
import Profile2 from "../profile/Profile2";
import Posts from "../posts/Posts";
import Post from "../post/Post";
import Feed from "../feed/Feed";
import Navbar from "../layout/Navbar";
import Friends from "../profiles/Friends";
import Friends1 from "../profiles/Friends1";
import Projects from "../profiles/Projects";
import Project from "../profiles/Project";
import AddPortfolio from "../addportfolio/AddPortfolio";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../NotFound";
import ChatPage from "../chat/ChatPage";

const Routes = (props) => {
  return (
    <Fragment>
      <Navbar />
      <Switch>
        <PrivateRoute exact path="/portfolio" component={Portfolio} />
        <PrivateRoute exact path="/portfolio/:id" component={Portfolio1} />
        <PrivateRoute exact path="/addfiles" component={AddPortfolio} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute
          exact
          path="/create-group-profile"
          component={CreateGroupProfile}
        />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/profile" component={Profile2} />
        <PrivateRoute exact path="/profiles" component={Profiles} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <PrivateRoute exact path="/add-award" component={AddAward} />
        <PrivateRoute exact path="/add-events" component={AddEvents} />
        <PrivateRoute exact path="/add-skills" component={AddSkills} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/posts/:id" component={Post} />
        <PrivateRoute exact path="/feed" component={Feed} />
        <PrivateRoute exact path="/friends" component={Friends} />
        <PrivateRoute exact path="/chats/:id" component={ChatPage} />
        <PrivateRoute exact path="/friends/:id" component={Friends1} />
        <PrivateRoute exact path="/projects/:id" component={Projects} />
        <PrivateRoute exact path="/project" component={Project} />
        <Route exact path="*" component={NotFound} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
