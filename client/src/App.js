import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Register from "./screens/Register";
import Login from "./screens/Login";
import MembersHome from "./screens/MembersHome";
import Contact from "./screens/Contact";
import ThankYou from "./screens/ThankYou";
import AdminUserList from "./screens/AdminUserList";
import AdminUserEditing from "./screens/AdminUserEditing";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/members" component={MembersHome} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/thank-you" component={ThankYou} />
        <Route exact path="/admin/users" component={AdminUserList} />
        <Route exact path="/admin/user/:id/edit" component={AdminUserEditing} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
