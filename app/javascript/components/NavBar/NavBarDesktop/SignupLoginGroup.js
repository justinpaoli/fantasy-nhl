import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

export default withRouter(function SignupLoginGroup(props) {
  return (
    <Button.Group>
      <Button onClick={() => props.history.push('/signup')}>
        Sign Up
      </Button>
      <Button.Or />
      <Button onClick={() => props.history.push('/login')}>
        Login
      </Button>
    </Button.Group>
  );
});