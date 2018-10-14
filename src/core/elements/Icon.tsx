import React from 'react';
import { AsProps } from 'reakit/ts/_utils/types';

const Icon: React.StatelessComponent<AsProps<any>> = ({ as: T, ...props }) => (
  <div>
    <T width="1.5em" height="1.5em" {...props} />
  </div>
);

export default Icon;
