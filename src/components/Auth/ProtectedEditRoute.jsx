// } else if (context.isLoggedIn && context.user.userName.includes(/{username}) ) {

import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { withUser } from './withUser';

const ProtectedEditRoute = ({
  component: Component,
  context,
  path,
  username,
  ...rest
}) => {
  if (context.isLoading) {
    return null;
  } else if (
    context.isLoggedIn
    // &&
    // context.user.userName.includes({ path }, -5)
  ) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } else {
    //add error message: you must be authentified to access this page
    return <Redirect to="/error_404" />;
  }
};

export default withUser(ProtectedEditRoute);
