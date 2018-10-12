import * as React from 'react';
import styles from './App.module.scss';
import logo from './logo.svg';

class App extends React.Component {
  componentDidMount() {
    window.Intercom('boot', {
      app_id: process.env.REACT_APP_INTERCOM_ID,
    });
  }

  render() {
    return (
      <div className={styles.app}>
        <header className={styles.header}>
          <img src={logo} className={styles.logo} alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className={styles.link}
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
