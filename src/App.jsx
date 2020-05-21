import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// components
import NavBar from './components/Nav/NavBar';
import Backdrop from './components/Nav/Backdrop';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import HamburgerMenu from './components/Nav/HamburgerMenu';

// pages
import Profile from './pages/Profile';
import Login from './pages/Login';
import ProfileEdit from './pages/ProfileEdit';
import CollabEdit from './pages/CollabEdit';
import CollabNew from './pages/CollabNew';
import Messages from './pages/Messages';
import Message from './pages/Message';
import FreelancersFeed from './pages/FreelancersFeed';
import CollabsFeed from './pages/CollabsFeed';
import Collab from './pages/Collab';
import About from './pages/About';
import Error_404 from './pages/Error_404';

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
      // <div className="App" onLoad={window.scroll(0, 0)}>
      <div className="App">
        <NavBar
          toggled={this.state.hamburgerMenuOpen}
          hamburgerClickHandler={this.hamburgerMenuToggleHandler}
          click={this.backdropClickHandler}
        />
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
            <ProtectedRoute exact path="/messages" component={Messages} />
            <ProtectedRoute exact path="/messages/:id" component={Message} />
            <Route exact path="/collab/new" component={CollabNew} />
            <ProtectedRoute
              exact
              path="/collab/:id/edit"
              component={CollabEdit}
            />
            <Route exact path="/collab/:id" component={Collab} />
            <Route exact path="/about" component={About} />
            <Route exact path="/login" component={Login} />
            <ProtectedRoute
              exact
              path="/:username/edit"
              component={ProfileEdit}
            />
            {/* <Route exact path="/error_404" component={Error_404} /> */}
            <Route exact path="/error_404" component={Error_404} />
            <Route exact path="/:username" component={Profile} />
            {/* <Route exact path=`/${username}` component={Profile} /> */}
            <Route exact path="/*" component={Error_404} />
          </Switch>
        </main>
      </div>
    );
  }
}
