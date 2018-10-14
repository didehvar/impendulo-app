import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AuthContainer from './auth/AuthContainer';
import AuthRoutes from './auth/AuthRoutes';
import Intercom from './external/Intercom';
import Home from './pages/Home';

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
            <AuthRoutes />
          </Switch>
        </>
      </Router>
    );
  }
}

export default App;
