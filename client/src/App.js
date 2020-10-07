import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

//Importing Components
import NavBar from "./components/NavBar";
// import Footer from "./components/Footer";
import Archive from "./components/Archive";
import ArchiveDetail from "./components/ArchiveDetail";
import Favorites from "./components/Favorites";
import AddNew from "./components/AddNew";
import Header from "./components/Header";
import Profile from "./components/Profile";

function App() {
  return (
    <div>
      <Header />
      <NavBar />
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
      </Switch>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
