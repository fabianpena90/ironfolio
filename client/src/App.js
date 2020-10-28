import React, { Component, Fragment, useState, useEffect } from "react";
import { Switch, Route, NavLink, useHistory } from "react-router-dom";
import "./App.css";
//Importing Components
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Archive from "./components/Archive";
import ArchiveDetail from "./components/ArchiveDetail";
import Favorites from "./components/Favorites";
import AddNew from "./components/AddNew";
import Header from "./components/Header";
import Profile from "./components/Profile";
import NotFound from "./components/404/NotFound";
import FormUpdate from "./components/FormUpdate";
import AddNewClass from "./components/AddNewClass";
// Auth Components
import TheContext from "./TheContext";
import actions from "./api/index";
import GoogleAuth from "./components/auth/GoogleAuth";
import GoogleAuthLogin from "./components/auth/GoogleAuthLogin";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

function App() {
  let [user, setUser] = useState(null);
  //console.log(user);
  useEffect(() => {
    async function getUser() {
      let user = await actions.getUser();
      //console.log("user is", user);
      setUser(user?.data);
    }
    getUser();
  }, []);

  const history = useHistory();

  return user === null || // if statement to see if user is register or not. if it is page will go to the profile
    user === undefined || // if not, 404 will display
    JSON.stringify(user) === "{}" ? (
    <div className="google">
      <div className="header">
        <h1>IRONFOLIO</h1>
        <p>Where you can explore and collaborate...</p>
      </div>
      {!user && <GoogleAuth setUser={setUser} />}
      {!user && <GoogleAuthLogin setUser={setUser} />}
      {JSON.stringify(user) === "{}" && <Route component={NotFound} />}
      <NotificationContainer />
    </div>
  ) : (
    <div>
      <TheContext.Provider value={{ history, user, setUser }}>
        <Header />
        <div className="container">
          <div className="navbar">
            <NavBar setUser={setUser} history={history} />
          </div>
          <div className="body">
            <Switch>
              <Route exact path="/" render={() => <Profile user={user} />} />
              <Route
                exact
                path="/addNewClass"
                render={() => <AddNewClass user={user} />}
              />
              <Route
                exact
                path="/editProject/:id"
                render={(props) => <FormUpdate {...props} user={user} />}
              />
              <Route
                exact
                path="/newproject"
                render={() => <AddNew user={user} />}
              />
              <Route
                exact
                path="/archive"
                render={(props) => <Archive {...props} user={user} />}
              />
              <Route
                exact
                path="/archive/:id"
                render={(props) => <ArchiveDetail {...props} user={user} />}
              />
              <Route
                exact
                path="/favorites"
                render={(props) => <Favorites {...props} user={user} />}
              />
            </Switch>
          </div>
        </div>
      </TheContext.Provider>
      <Footer />
      <NotificationContainer />
    </div>
  );
}

export default App;
