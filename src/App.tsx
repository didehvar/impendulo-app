import * as React from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import history from './history';
import Auth from './pages/Auth';
import AuthCallback from './pages/AuthCallback';
import Home from './pages/Home';

class App extends React.Component {
  componentDidMount() {
    window.Intercom('boot', {
      app_id: process.env.REACT_APP_INTERCOM_ID,
    });
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/auth" component={Auth} />
          <Route exact path="/auth/callback" component={AuthCallback} />
        </Switch>
      </Router>
    );
  }
}

export default App;
