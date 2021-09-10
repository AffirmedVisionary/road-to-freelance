import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import MembersHome from "./pages/MembersHome";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/members" component={MembersHome} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
