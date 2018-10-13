import * as React from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import Auth0 from './components/Auth0';
import Intercom from './components/Intercom';
import history from './history';
import Auth from './pages/Auth';
import AuthCallback from './pages/AuthCallback';
import Home from './pages/Home';

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <>
          <Auth0>
            {({ authenticated, user }) => {
              console.log('appauth0', authenticated, user); // tslint:disable-line
              return <Intercom authenticated={authenticated} user={user} />;
            }}
          </Auth0>

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/auth" component={Auth} />
            <Route exact path="/auth/callback" component={AuthCallback} />
          </Switch>
        </>
      </Router>
    );
  }
}

export default App;
