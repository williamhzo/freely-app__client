import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NavMain from './components/NavMain';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
// import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import ProfilesFeed from './pages/ProfilesFeed';
import CollabsFeed from './pages/CollabsFeed';
import Collab from './pages/Collab';
import About from './pages/About';

function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        <Route exact path="/" component={ProfilesFeed} />
        <Route exact path="/collabs" component={CollabsFeed} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/collab" component={Collab} />
        <Route exact path="/about" component={About} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        {/* <ProtectedRoute exact path="/profile" component={Profile} /> */}
      </Switch>
    </div>
  );
}

export default App;
