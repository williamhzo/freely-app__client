import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { withUser } from './withUser';

const ProtectedRoute = ({ component: Component, context, ...rest }) => {
  if (context.isLoading) {
    return null;
  } else if (context.isLoggedIn) {
  // } else if (context.isLoggedIn && context.user.userName.includes(/{username}) ) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } else {
    return <Redirect to="/login" />;
  }
};

export default withUser(ProtectedRoute);
