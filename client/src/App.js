import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

//Importing Components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Archive from "./components/Archive";
import Favorites from "./components/Favorites";

function App() {
  return (
    <div>
    <NavBar />
    <Switch>
      {/* <Route exact path="/" render={() =>  <NavBar />} /> */}
      <Route exact path="/archive" render={() =>  <Archive />} />
      <Route exact path="/favorites" render={() =>  <Favorites />} />
    </Switch>
    <Footer />
    </div>
  );
}

export default App;
