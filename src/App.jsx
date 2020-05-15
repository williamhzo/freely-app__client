import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Login from "./pages/Login";
// import ProtectedRoute from './components/ProtectedRoute';
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import ProfilesFeed from "./pages/ProfilesFeed";
import CollabsFeed from "./pages/CollabsFeed";
import Collab from "./pages/Collab";
import About from "./pages/About";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={ProfilesFeed} />
          <Route exact path="/collabs" component={CollabsFeed} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/collab" component={Collab} />
          <Route exact path="/about" component={About} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/:username/edit" component={ProfileEdit} />
          <Route exact path="/:username" component={Profile} />
          {/* <ProtectedRoute exact path="/profile" component={Profile} /> */}
        </Switch>
      </div>
    );
  }
}

// export default App;
