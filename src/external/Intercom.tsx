import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import User from 'src/core/interfaces/User';

import IntercomAttributes from './IntercomAttributes';

interface Props extends RouteComponentProps {
  authenticated: boolean;
  user?: User;
}

class Intercom extends React.Component<Props> {
  static appId = process.env.REACT_APP_INTERCOM_ID;

  componentDidMount() {
    if (typeof window.Intercom === 'function') {
      window.Intercom('reattach_activator');
      return this.update(true);
    }

    window.Intercom = Object.assign(
      (...args: any[]) => window.Intercom.c(...args),
      {
        c: (...args: any[]) => window.Intercom.q.push(args),
        q: [],
      },
    );

    window.addEventListener('beforeunload', this.shutdown);
    this.boot();
    this.createScript();
  }

  componentDidUpdate(prevProps: Props) {
    const { authenticated, location } = this.props;

    if (authenticated !== prevProps.authenticated) {
      if (authenticated) {
        this.update(true);
      } else {
        this.shutdown();
        this.boot();
      }
    }

    if (location.pathname !== prevProps.location.pathname) {
      this.update();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.shutdown);
  }

  boot = () => window.Intercom('boot', this.settings());

  update = (withSettings: boolean = false) =>
    window.Intercom('update', withSettings ? this.settings() : undefined);

  shutdown() {
    window.Intercom('shutdown');
  }

  settings(): IntercomAttributes {
    const { authenticated, user } = this.props;
    let attrs: IntercomAttributes = { app_id: Intercom.appId };

    if (authenticated && user) {
      attrs = { ...attrs, ...this.mapUser(user) };
    }

    return attrs;
  }

  mapUser({
    email,
    name,
    picture,
    createdAt,
    intercomHash,
  }: User): Partial<IntercomAttributes> {
    return {
      avatar: { type: 'avatar', image_url: picture },
      created_at: createdAt,
      email,
      name,
      user_hash: intercomHash,
    };
  }

  createScript() {
    if (document) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = `https://widget.intercom.io/widget/${Intercom.appId}`;

      const head = document.getElementsByTagName('head')[0];
      head.appendChild(script);
    }
  }

  render() {
    return null;
  }
}

export default withRouter<Props>(Intercom);
