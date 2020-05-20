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
        <nav id="Nav" className="Nav">
          <NavLink exact onClick={props.click} to="/">
            <h3 className="Nav__logo">Freely</h3>
          </NavLink>
          <ul className="Nav__list">
            <li className="Nav__item">
              <NavLink
                className="Nav__link"
                exact
                onClick={props.click}
                to={context.user ? '/collabs-create' : '/login'}
              >
                <span className="Nav__plus-icon">+</span>
                <p className="Nav__plus-icon-text">Create a bundle</p>
              </NavLink>
            </li>
            <li className="Nav__item">
              <NavLink
                className="Nav__link"
                onClick={props.click}
                to={context.user ? `/${context.user.userName}` : '/login'}
              >
                {/* <div
                  className="Nav__avatar"
                  style={{
                    backgroundImage: context.user
                      ? `url(${context.user.profilePicture})`
                      : 'url("media/avatar2.png")',
                  }}
                ></div> */}
                {/* {context.user && (
                  <div
                    className="Nav__avatar"
                    style={{
                      backgroundImage: `url(${context.user.profilePicture})`,
                    }}
                  ></div>
                )} */}
                {context.user && <div>{context.user.name}</div>}
                {!context.user && <div>Profile</div>}
              </NavLink>
            </li>
            <li className="Nav__item hamburger__button">
              <HamburgerButton
                click={props.hamburgerClickHandler}
                hamburgerToggle={props.toggled}
                // context={context}
              />
            </li>
            {context.user && (
              <li className="Nav__item hamburger__item">
                <NavLink className="Nav__link" exact to="/messages">
                  Messages
                </NavLink>
              </li>
            )}
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
              <li className="Nav__item hamburger__item primary-btn">
                <NavLink className="Nav__link" exact to="/login">
                  Join
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
