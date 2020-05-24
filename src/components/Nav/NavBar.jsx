// import React, { useState } from 'react';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withUser } from '../Auth/withUser';
import apiHandler from '../../api/apiHandler';

import HamburgerButton from './HamburgerButton';

import '../../styles/NavBar.scss';

class NavBar extends Component {
  state = {
    notification: false,
  };
  handleLogout = (removeUserCallBack) => {
    apiHandler
      .logout()
      .then(() => {
        removeUserCallBack();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  checkNotifications = () => {
    if (this.props.context.user) {
      apiHandler
        .checkNotifications(this.props.context.user._id)
        .then((apiRes) => {
          if (apiRes) {
            this.setState({ notification: true });
          }
        });
    }
  };
  componentDidMount = () => {
    setInterval(this.checkNotifications, 2000);
  };

  // const [isEditing, setEdit] = useState(false);
  render() {
    return (
      <nav id="Nav" className="Nav">
        <NavLink exact onClick={this.props.click} to="/">
          <h3 className="Nav__logo">
            Freely<span className="Nav__logo--colored-dot">.</span>
          </h3>
        </NavLink>
        <ul className="Nav__list">
          <li className="Nav__item">
            <NavLink
              className="Nav__link"
              activeClassName="Nav__active"
              isActive={(match, location) => {
                if (!match) {
                  return false;
                }
                const eventID = parseInt(match.params.eventID);
                return this.props.context.user
                  ? match.url === location.pathname
                  : match.url === location.pathname &&
                      !isNaN(eventID) &&
                      eventID % 2 === 1;
              }}
              exact
              onClick={this.props.click}
              to={this.props.context.user ? '/collab/new' : '/login'}
            >
              <span className="Nav__plus-icon">+</span>
              <p className="Nav__plus-icon-text">Create a Project</p>
            </NavLink>
          </li>
          <li className="Nav__item hamburger__button">
            <HamburgerButton
              click={this.props.hamburgerClickHandler}
              hamburgerToggle={this.props.toggled}
              // context={context}
            />
          </li>
          {this.props.context.user && (
            <li className="Nav__item hamburger__item  Nav__messages">
              <NavLink
                className="Nav__link"
                activeClassName="Nav__active"
                exact
                to="/messages"
              >
                Messages
              </NavLink>
              {this.state.notification && (
                <div className="Nav__notification"></div>
              )}
            </li>
          )}
          <li className="Nav__item hamburger__item">
            <NavLink
              className="Nav__link"
              activeClassName="Nav__active"
              exact
              to="/about"
            >
              About
            </NavLink>
          </li>
          <li className="Nav__item">
            <NavLink
              className="Nav__link"
              activeClassName="Nav__active"
              onClick={this.props.click}
              accountExists={true}
              to={
                this.props.context.user
                  ? `/${this.props.context.user.userName}`
                  : '/login'
              }
            >
              {this.props.context.user && (
                <div>{this.props.context.user.name}</div>
              )}
              {!this.props.context.user && <div>Log In</div>}
            </NavLink>
          </li>
          {this.props.context.user && (
            <li className="Nav__item hamburger__item">
              <NavLink
                className="Nav__link"
                exact
                to="/"
                onClick={(e) =>
                  this.handleLogout(this.props.context.removeUser)
                }
              >
                Log Out
              </NavLink>
            </li>
          )}
          {!this.props.context.user && (
            <li className="Nav__item">
              <NavLink
                className=" hamburger__item primary-btn"
                exact
                to="/login"
              >
                Join
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    );
  }
}

export default withUser(NavBar);
