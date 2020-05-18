// import React, { useState } from 'react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { withUser } from '../Auth/withUser';
import UserContext from '../Auth/UserContext';
import apiHandler from '../../api/apiHandler';

import HamburgerButton from './HamburgerButton';
// import SaveEditButton from './SaveEditButton';

import '../../styles/NavBar.scss';

const NavBar = (props) => {
  const handleLogout = (removeUserCallBack) => {
    apiHandler
      .logout()
      .then(() => {
        removeUserCallBack();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const [isEditing, setEdit] = useState(false);
  return (
    <UserContext.Consumer>
      {(context) => (
        <nav className="Nav">
          <NavLink className="Nav__link" exact to="/">
            <h3 className="Nav__logo">Freely</h3>
          </NavLink>
          <ul className="Nav__list">
            <li className="Nav__item">
              <NavLink className="Nav__link" exact to="/collabs-create">
                <span className="Nav__plus-icon">+</span>
              </NavLink>
            </li>
            <li className="Nav__item">
              <NavLink
                className="Nav__link"
                to={context.user ? '/profile' : '/login'}
              >
                <div
                  className="Nav__avatar"
                  style={{
                    backgroundImage: context.user
                      ? `url(${context.user.profilePicture})`
                      : 'url("media/avatar.png")',
                  }}
                ></div>
              </NavLink>
            </li>
            <li className="Nav__item">
              <HamburgerButton
                click={props.hamburgerClickHandler}
                hamburgerToggle={props.toggled}
                // context={context}
              />
            </li>
            {/* {isEditing && (
              <li className="Nav__item">
                <SaveEditButton onClick={(e) => handleFormSubmit()} />
              </li>
            )} */}
            <li className="Nav__item hamburger__item">
              <NavLink className="Nav__link" exact to="/collabs-create">
                About
              </NavLink>
            </li>
            {context.user && (
              <li className="Nav__item hamburger__item">
                <NavLink
                  className="Nav__link"
                  exact
                  to="/"
                  onClick={(e) => handleLogout(context.removeUser)}
                >
                  Log Out
                </NavLink>
              </li>
            )}
            {!context.user && (
              <li className="Nav__item hamburger__item">
                <NavLink className="Nav__link" exact to="/login">
                  Join Us
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      )}
    </UserContext.Consumer>
  );
};

export default withUser(NavBar);
