import React from 'react';
import { NavLink } from 'react-router-dom';
import { withUser } from '../Auth/withUser';
import UserContext from '../Auth/UserContext';
import HamburgerMenu from './HamburgerMenu';

import '../../styles/NavBar.scss';

const NavBar = () => {
  // console.log(context.user);
  return (
    <UserContext.Consumer>
      {(context) => (
        <nav className="Nav">
          <NavLink className="Nav__link" exact to="/">
            <h3 className="Nav__logo">
              Shark <br></br> Attack
            </h3>
            <span role="img" aria-label="shark-emoji">
              🦈
            </span>
          </NavLink>
          <ul className="Nav__list">
            {context.user && (
              <li className="Nav__item">
                <NavLink className="Nav__link" exact to="/collabs-create">
                  <img
                    className="Nav__icon"
                    src="media/plus-icon.svg"
                    alt="+"
                  />
                </NavLink>
              </li>
            )}
            {!context.user && (
              <li className="Nav__item">
                <NavLink className="Nav__link" exact to="/login">
                  <img
                    className="Nav__icon"
                    src="media/plus-icon.svg"
                    alt="+"
                  />
                </NavLink>
              </li>
            )}
            {context.user && (
              <div className="Nav__avatar">
                <li className="Nav__item">
                  <NavLink className="Nav__link" to="/profile">
                    <img src={context.user.profilePicture} alt="avatar" />
                  </NavLink>
                </li>
              </div>
            )}
            {!context.user && (
              <li className="Nav__item">
                <div className="Nav__avatar">
                  <NavLink className="Nav__link" to="/login">
                    <img src="media/avatar.png" alt="avatar" />
                  </NavLink>
                </div>
              </li>
            )}
            {/* <li className="Nav__item">
              <img className="Nav__icon" src="media/hamburger.svg" alt="menu" />
              {/* <li className="Nav__item">
                  <p onClick={handleLogout}>Logout</p>
                </li>
            </li> */}
            <li className="Nav__item">
              <HamburgerMenu context={context} />
            </li>
          </ul>
        </nav>
      )}
    </UserContext.Consumer>
  );
};

export default withUser(NavBar);
