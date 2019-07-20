import React, { useState, FunctionComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import Axios, { AxiosError } from 'axios';

interface LogoutProps extends RouteComponentProps {
  user: string
};

const Logout: FunctionComponent<LogoutProps> = (props) => {
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    return () => {
      setLoading(true);
      Axios
        .delete('/logout')
        .then(_response => {
          setLoading(false);
          // @ts-ignore
          gon.global.user = null;
          props.history.push('/');
        })
        .catch((_error: AxiosError) => {
          setLoading(false);
          // TODO: add message alerting user of failure
        })
    }
  }

  return (
    <Button.Group>
      <Button secondary>{props.user}</Button>
      <Button onClick={handleLogout()} loading={loading}>
        Logout
      </Button>
    </Button.Group>
  );
};

export default withRouter(Logout);