import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

const SignupLoginGroup: FunctionComponent<RouteComponentProps> = (props) => {
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
};

export default withRouter(SignupLoginGroup);