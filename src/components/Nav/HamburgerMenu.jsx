import React from 'react';
import { Link } from 'react-router-dom';
// import apiHandler from '../../api/apiHandler';
// import UserContext from '../Auth/UserContext';
// import { Slant as Hamburger } from 'hamburger-react';

const HamburgerMenu = (props) => {
  let hamburgerMenuClass = ['hamburger-menu'];
  if (props.show) hamburgerMenuClass.push('open');

  console.log(props.show);
  console.log(hamburgerMenuClass);
  return (
    <nav className={hamburgerMenuClass.join(' ')}>
      <ul className="hamburger-menu__list">
        <li className="hamburger-menu__item">
          <Link className="hamburger-menu__link" to="/about">
            About
          </Link>
        </li>
        <li className="hamburger-menu__item">
          <Link className="hamburger-menu__link" to="/">
            Log Out
          </Link>
        </li>
      </ul>
    </nav>
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
