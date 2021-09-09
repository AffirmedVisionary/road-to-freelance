
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Register from "./pages/Register";
import Login from "./pages/LogIn";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/register" component={Register} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/contact" component={Contact} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
