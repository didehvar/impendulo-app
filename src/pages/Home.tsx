import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {}

class Home extends React.PureComponent<Props, object> {
  render() {
    return (
      <div>
        Home <Link to="/auth">Auth</Link>
      </div>
    );
  }
}

export default Home;
