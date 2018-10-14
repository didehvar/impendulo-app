import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AuthContainer from './auth/AuthContainer';
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
            {({ authenticated, user }) => (
              <Intercom authenticated={authenticated} user={user} />
            )}
          </AuthContainer>

          <Switch>
            <Route exact path="/" component={Home} />

            <Route exact path="/auth" component={AuthPage} />
            <Route exact path="/auth/callback" component={AuthCallbackPage} />
          </Switch>
        </>
      </Router>
    );
  }
}

export default App;
