import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import apiHandler from '../../api/apiHandler';
import UserContext from '../Auth/UserContext';
import { Slant as Hamburger } from 'hamburger-react';

class HamburgerMenu extends Component {
  static contextType = UserContext;

  state = {
    isToggled: false,
  };

  handleLogout = (event) => {
    event.preventDefault();
    apiHandler
      .logout()
      .then(() => {
        this.context.removeUser();
      })
      .catch((error) => {
        console.log(error);
      });
    this.handleToggle();
  };

  handleToggle = (toggled) => {
    this.setState({ isToggled: toggled ? true : false });
  };

  render() {
    console.log(this.state.isToggled);
    return (
      <>
        <Hamburger onToggle={this.handleToggle} />
        {this.state.isToggled && (
          <>
            <div className="hamb-menu__background"></div>
            <ul className="hamb-menu">
              <li className="hamb-menu__item">
                <NavLink
                  onClick={this.handleToggle}
                  to="/about"
                  className="hamb-menu__item"
                >
                  About
                </NavLink>
              </li>
              <li className="hamb-menu__item">
                <NavLink
                  onClick={this.handleLogout}
                  to="/"
                  className="hamb-menu__item"
                >
                  Log Out
                </NavLink>
              </li>
            </ul>
          </>
        )}
      </>
    );
  }
}

export default HamburgerMenu;
