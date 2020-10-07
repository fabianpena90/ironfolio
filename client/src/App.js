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
import NotFound from "./components/404/NotFound.js";
// Auth Components
import TheContext from "./TheContext";
// import SignUp from "./components/auth/SignUp";
// import LogIn from "./components/auth/LogIn";
import actions from "./api/index";
import GoogleAuth from "./components/auth/GoogleAuth";
import GoogleAuthLogin from "./components/auth/GoogleAuthLogin";
import { NotificationContainer, NotificationManager, } from "react-notifications";

function App() {
  let [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      let user = await actions.getUser();
      console.log("user is", user);
      setUser(user?.data);
    }
    getUser();
  }, []);

  const logOut = async () => {
    let res = await actions.logOut();
    setUser(null);
  };

  const history = useHistory();


  return (
    
    <div>
    <TheContext.Provider value={{ history, user, setUser }}>
    {user?.email}      
      <Header />
      <div className="container">
        <div>
          <NavBar />
        </div>
        <div className="body">
          <Switch>
            <Route exact path="/profile" render={() => <Profile />} />
            <Route exact path="/newproject" render={() => <AddNew />} />
            <Route exact path="/archive" render={() => <Archive />} />
            <Route
              exact
              path="/archive/:id"
              render={(props) => <ArchiveDetail {...props} />}
            />
            <Route exact path="/favorites" render={() => <Favorites />} />
            {/* <Route component={NotFound} /> */}
          </Switch>
        </div>
      </div>
      {!user && <GoogleAuth setUser={setUser} />}
      {!user && <GoogleAuthLogin setUser={setUser} />}
      <NotificationContainer />
      </TheContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
