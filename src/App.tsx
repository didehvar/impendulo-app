import * as React from 'react';

import styles from './App.module.scss';
import Auth from './Auth';

class App extends React.Component {
  componentDidMount() {
    window.Intercom('boot', {
      app_id: process.env.REACT_APP_INTERCOM_ID,
    });
  }

  render() {
    return (
      <div className={styles.app}>
        <Auth />
      </div>
    );
  }
}

export default App;
