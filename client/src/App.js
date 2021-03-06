import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalStyles from "./components/GlobalStyles";
import Header from "./Header";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import JobDetails from "./components/JobDetails";
import Apply from "./components/Apply";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import MyProfile from "./components/MyProfile";
import ViewApplication from "./components/ViewApplication";
import PostJob from "./components/PostJob";
import JobDashboard from "./components/JobDashboard";
import PublicCandidateProfile from "./components/PublicCandidateProfile";
import PublicEmployerProfile from "./components/PublicEmployerProfile";
import Community from "./components/Community";
import Creator from "./components/Creator";
import Footer from "./Footer";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/jobs">
          <Jobs />
        </Route>
        <Route path="/job/:_id">
          <JobDetails />
        </Route>
        <Route path="/job/:jobId/application">
          <Apply />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/me/:id">
          <MyProfile />
        </Route>
        <Route path="/application/:_id">
          <ViewApplication />
        </Route>
        <Route path="/postajob">
          <PostJob />
        </Route>
        <Route path="/jobdashboard/:_id">
          <JobDashboard />
        </Route>
        <Route path="/candidate/:_id">
          <PublicCandidateProfile />
        </Route>
        <Route path="/employer/:_id">
          <PublicEmployerProfile />
        </Route>
        <Route path="/community">
          <Community />
        </Route>
        <Route path="/creator">
          <Creator />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
