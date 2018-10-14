import * as React from 'react';
import { IoIosMoon } from 'react-icons/io';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Heading, Link } from 'reakit';
import Icon from 'src/core/elements/Icon';
import ThemeContainer from 'src/core/theme/ThemeContainer';

const Home: React.StatelessComponent = () => (
  <div>
    <Heading>Home</Heading>
    <Link as={RouterLink} to="/auth" margin="0 0 2rem">
      Auth
    </Link>
    <div>
      <ThemeContainer>
        {({ toggleMode }) => (
          <Button onClick={toggleMode}>
            <Icon as={IoIosMoon} />
          </Button>
        )}
      </ThemeContainer>
    </div>
  </div>
);

export default Home;
