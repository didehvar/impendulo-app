import * as React from 'react';
import { Route } from 'react-router';

import AuthCallbackPage from './AuthCallbackPage';
import AuthPage from './AuthPage';

class AuthRoutes extends React.PureComponent {
  render() {
    return (
      <>
        <Route exact path="/auth" component={AuthPage} />
        <Route exact path="/auth/callback" component={AuthCallbackPage} />
      </>
    );
  }
}

export default AuthRoutes;
