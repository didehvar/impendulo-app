import * as React from 'react';
import { Link } from 'react-router-dom';

interface IHomeProps {}

class Home extends React.PureComponent<IHomeProps, object> {
  render() {
    return (
      <div>
        Home <Link to="/auth">Auth</Link>
      </div>
    );
  }
}

export default Home;
