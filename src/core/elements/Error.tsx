import * as React from 'react';
import { Button, Card, Heading, Paragraph } from 'reakit';

interface ErrorProps {
  retry?: () => void;
}

const Error: React.StatelessComponent<ErrorProps> = ({ children, retry }) => (
  <Card textAlign="center">
    <Heading as="h3">Something went wrong</Heading>
    <Paragraph>{children}</Paragraph>
    {retry && <Button onClick={retry}>Try again</Button>}
  </Card>
);

export default Error;
