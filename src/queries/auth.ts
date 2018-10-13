import gql from 'graphql-tag';

const AUTH_QUERY = gql`
  {
    authenticated @client
  }
`;

export default AUTH_QUERY;
