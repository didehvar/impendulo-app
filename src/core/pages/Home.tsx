import * as React from 'react';
import { IoIosMoon } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { Button } from 'reakit';
import Icon from 'src/core/elements/Icon';
import ThemeContainer from 'src/core/theme/ThemeContainer';

const Home: React.StatelessComponent = () => (
  <div>
    Home <Link to="/auth">Auth</Link>
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
