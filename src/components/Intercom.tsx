import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import { User } from './Auth0';

interface IntercomAttributes {
  app_id: string;
  custom_launcher_selector?: string;

  email?: string;
  created_at?: string;
  name?: string;
  user_hash?: string;
  avatar?: {
    type: 'avatar';
    image_url: string;
  };
}

interface Props extends RouteComponentProps {
  authenticated: boolean;
  user?: User;
}

interface State {}

class Intercom extends React.Component<Props, State> {
  static appId = process.env.REACT_APP_INTERCOM_ID;

  componentDidMount() {
    if (typeof window.Intercom === 'function') {
      window.Intercom('reattach_activator');
      window.Intercom('update', this.settings());
      return;
    }

    window.Intercom = Object.assign(
      (...args: any[]) => window.Intercom.c(...args),
      {
        c: (...args: any[]) => window.Intercom.q.push(args),
        q: [],
      },
    );

    console.log('intercom boot'); // tslint:disable-line
    window.Intercom('boot', this.settings());
    this.createScript();
  }

  componentDidUpdate(prevProps: Props) {
    const { location } = this.props;

    console.log('Intercom update', location, prevProps.location); // tslint:disable-line
    if (location.pathname !== prevProps.location.pathname) {
      console.log('intercom update'); // tslint:disable-line
      window.Intercom('update');
    }
  }

  settings(): IntercomAttributes {
    const { authenticated, user } = this.props;

    let attrs: IntercomAttributes = {
      app_id: Intercom.appId,
    };

    if (authenticated && user) {
      const { email, name, picture, createdAt, idHash } = user;

      attrs = {
        ...attrs,
        avatar: { type: 'avatar', image_url: picture },
        created_at: createdAt,
        email,
        name,
        user_hash: idHash,
      };
    }

    return attrs;
  }

  createScript() {
    if (!document) {
      return;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = `https://widget.intercom.io/widget/${Intercom.appId}`;

    const head = document.getElementsByTagName('head')[0];
    head.appendChild(script);
  }

  render() {
    return null;
  }
}

export default withRouter<Props>(Intercom);
