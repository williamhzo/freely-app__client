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
            <h3 className="Nav__logo">Freely</h3>
          </NavLink>
          <ul className="Nav__list">
            <li className="Nav__item">
              <NavLink className="Nav__link" exact to="/collabs-create">
                <span className="Nav__link--plus-icon">+</span>
              </NavLink>
            </li>
            {context.user && (
              <li className="Nav__item">
                <NavLink className="Nav__link" to="/profile">
                  {/* <div
                    className="Nav__avatar"
                    style={`backgroundImage:url("${context.user.profilePicture}")`}
                  ></div> */}
                  <img src={context.user.profilePicture} alt="avatar" />
                </NavLink>
              </li>
            )}
            {!context.user && (
              <li className="Nav__item">
                <NavLink className="Nav__link" to="/login">
                  <img src="media/avatar.png" alt="avatar" />
                </NavLink>
              </li>
            )}
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
