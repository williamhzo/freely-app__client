import React from 'react';
import { NavLink } from 'react-router-dom';
import { withUser } from './Auth/withUser';
import apiHandler from '../api/apiHandler';
import UserContext from './Auth/UserContext';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';

import '../styles/NavBar.scss';

const NavBar = (props) => {
  const { context } = props;

  function handleLogout() {
    apiHandler
      .logout()
      .then(() => {
        context.removeUser();
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
            <li className="Nav__item">
              <img className="Nav__icon" src="media/hamburger.svg" alt="menu" />
              {/* <li className="Nav__item">
                  <p onClick={handleLogout}>Logout</p>
                </li> */}
            </li>
            {/* {context.isLoggedIn && (
              <React.Fragment>
                <li className="Nav__item">
                  <NavLink className="Nav__link" to="/profile">
                    {context.user && context.user.email}
                  </NavLink>
                </li>
                <li className="Nav__item">
                  <p onClick={handleLogout}>Logout</p>
                </li>
              </React.Fragment>
            )} */}
            {/* {!context.isLoggedIn && (
              <React.Fragment>
                <li className="Nav__item">
                  <NavLink className="Nav__link" to="/signin">
                    Log in
                  </NavLink>
                </li>
                <li className="Nav__item">
                  <NavLink to="/signup">Create account</NavLink>
                </li>
              </React.Fragment>
            )} */}
          </ul>
        </nav>
      )}
    </UserContext.Consumer>
  );
};

export default withUser(NavBar);
