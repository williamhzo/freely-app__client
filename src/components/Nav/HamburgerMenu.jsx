import React from 'react';
import { Link } from 'react-router-dom';
import apiHandler from '../../api/apiHandler';
import UserContext from '../Auth/UserContext';

const HamburgerMenu = (props) => {
  let hamburgerMenuClass = ['hamburger-menu'];
  if (props.show) hamburgerMenuClass.push('open');

  const handleLogout = (removeUserCallBack, closeMenu) => {
    apiHandler
      .logout()
      .then(() => {
        removeUserCallBack();
      })
      .catch((error) => {
        console.log(error);
      });
    // execute callback to backdropClickHandler in App.jsx
    closeMenu();
  };
  return (
    <UserContext.Consumer>
      {(context) => (
        <nav className={hamburgerMenuClass.join(' ')}>
          <ul className="hamburger-menu__list">
            {!context.user && (
              <li className="hamburger-menu__item">
                <Link className="hamburger-menu__link" to="/login">
                  Join Us
                </Link>
              </li>
            )}
            <li className="hamburger-menu__item">
              <Link
                className="hamburger-menu__link"
                to="/about"
                onClick={props.click}
              >
                About
              </Link>
            </li>
            {context.user && (
              <li className="hamburger-menu__item">
                <Link
                  className="hamburger-menu__link"
                  to="/"
                  onClick={(e) => handleLogout(context.removeUser, props.click)}
                >
                  Log Out
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </UserContext.Consumer>
  );
};

export default HamburgerMenu;

// class HamburgerMenu extends Component {
//   static contextType = UserContext;

//   state = {
//     isToggled: false,
//   };

//   handleLogout = (event) => {
//     event.preventDefault();
//     apiHandler
//       .logout()
//       .then(() => {
//         this.context.removeUser();
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     this.handleToggle();
//   };

//   handleToggle = (toggled) => {
//     this.setState({ isToggled: toggled ? true : false });
//   };

//   render() {
//     console.log(this.state.isToggled);
//     return (
//       <>
//         <Hamburger onToggle={this.handleToggle} />
//         {this.state.isToggled && (
//           <>
//             <div className="hamb-menu__background"></div>
//             <ul className="hamb-menu">
//               <li className="hamb-menu__item">
//                 <NavLink
//                   onClick={this.handleToggle}
//                   to="/about"
//                   className="hamb-menu__item"
//                 >
//                   About
//                 </NavLink>
//               </li>
//               <li className="hamb-menu__item">
//                 <NavLink
//                   onClick={this.handleLogout}
//                   to="/"
//                   className="hamb-menu__item"
//                 >
//                   Log Out
//                 </NavLink>
//               </li>
//             </ul>
//           </>
//         )}
//       </>
//     );
//   }
// }
