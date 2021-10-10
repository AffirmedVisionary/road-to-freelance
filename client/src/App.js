import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Register from "./screens/Register";
import Login from "./screens/Login";
import MembersHome from "./screens/MembersHome";
import Contact from "./screens/Contact";
import ThankYou from "./screens/ThankYou";
import Home from "./screens/Home";
import Book from "./screens/Book";
import MyBook from "./screens/BookPageFlip";
import BookThree from "./screens/BookThree";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/first-book" component={Book} />
        <Route exact path="/second-book" component={MyBook} />
        <Route exact path="/third-book" component={BookThree} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/members" component={MembersHome} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/thank-you" component={ThankYou} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
