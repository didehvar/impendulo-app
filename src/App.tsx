import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import styles from './App.module.scss';
import Auth from './Auth';
import Home from './pages/Home';

class App extends React.Component {
  componentDidMount() {
    window.Intercom('boot', {
      app_id: process.env.REACT_APP_INTERCOM_ID,
    });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/auth" component={Auth} />
        </Switch>
      </Router>
    );
  }
}

export default App;
