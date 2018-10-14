import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AuthContainer from './auth/AuthContainer';
import CoreLayout from './core/layouts/CoreLayout';
import AuthCallbackPage from './core/pages/AuthCallbackPage';
import AuthPage from './core/pages/AuthPage';
import Home from './core/pages/Home';
import Intercom from './external/Intercom';

class App extends React.Component {
  render() {
    return (
      <Router>
        <>
          <AuthContainer>
            {({ isAuthenticated, user }) => (
              <Intercom authenticated={isAuthenticated()} user={user} />
            )}
          </AuthContainer>

          <CoreLayout>
            <Switch>
              <Route exact path="/" component={Home} />

              <Route exact path="/auth" component={AuthPage} />
              <Route exact path="/auth/callback" component={AuthCallbackPage} />
            </Switch>
          </CoreLayout>
        </>
      </Router>
    );
  }
}

export default App;
