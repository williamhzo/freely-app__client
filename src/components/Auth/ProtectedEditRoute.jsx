// } else if (context.isLoggedIn && context.user.userName.includes(/{username}) ) {


// component below is redundant: check if performed directly within /:username/edit pages (ProfileEdit.jsx)

// import React from 'react';
// import { Redirect, Route, withRouter } from 'react-router-dom';
// import { withUser } from './withUser';

// const ProtectedEditRoute = ({
//   component: Component,
//   context,
//   path,
//   username,
//   history,
//   location,
//   match,
//   // match.params.username
//   ...rest
// }) => {
//   console.log(match)
//   if (context.isLoading) {
//     return null;
//   } else if (
//     context.isLoggedIn
//     // &&
//     // context.user.userName.includes({ path }, -5)
//   ) {
//     return <Route {...rest} render={(props) => <Component {...props} />} />;
//   } else {
//     //add error message: you must be authentified to access this page
//     return <Redirect to="/error_404" />;
//   }
// };

// export default withRouter(withUser(ProtectedEditRoute));
