import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

//Importing Components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Archive from "./components/Archive";

function App() {
  return (
    <div>
    <NavBar />
    <Switch>
      {/* <Route exact path="/" render={() =>  <NavBar />} /> */}
      <Route exact path="/archive" render={() =>  <Archive />} />
    </Switch>
    <Footer />
    </div>
  );
}

export default App;
