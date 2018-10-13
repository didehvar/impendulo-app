import * as React from 'react';

import './Spinner.scss';

interface Props {}

class Spinner extends React.PureComponent<Props, object> {
  render() {
    return <div className="spinner" />;
  }
}

export default Spinner;
