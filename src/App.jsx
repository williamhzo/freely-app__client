import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import NavBar from './components/Nav/NavBar';
import Login from './pages/Login';
// import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import FreelancersFeed from './pages/FreelancersFeed';
import CollabsFeed from './pages/CollabsFeed';
import Collab from './pages/Collab';
import About from './pages/About';
import HamburgerMenu from './components/Nav/HamburgerMenu';
import Backdrop from './components/Nav/Backdrop';

export default class App extends Component {
  state = {
    hamburgerMenuOpen: false,
  };

  hamburgerMenuToggleHandler = () => {
    this.setState((prevState) => {
      return { hamburgerMenuOpen: !prevState.hamburgerMenuOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ hamburgerMenuOpen: false });
  };

  render() {
    return (
      <div className="App">
        <NavBar hamburgerClickHandler={this.hamburgerMenuToggleHandler} />
        {this.state.hamburgerMenuOpen ? (
          <Backdrop click={this.backdropClickHandler} />
        ) : null}
        {/* display on/off is handled in the CSS */}
        <HamburgerMenu
          show={this.state.hamburgerMenuOpen}
          click={this.backdropClickHandler}
        />
        <main className="main">
          <Switch>
            <Route exact path="/" component={FreelancersFeed} />
            <Route exact path="/collabs" component={CollabsFeed} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/collab/:id" component={Collab} />
            <Route exact path="/about" component={About} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/:username/edit" component={ProfileEdit} />
            <Route exact path="/:username" component={Profile} />
            {/* <ProtectedRoute exact path="/profile" component={Profile} /> */}
          </Switch>
        </main>
      </div>
    );
  }
}

// export default App;
