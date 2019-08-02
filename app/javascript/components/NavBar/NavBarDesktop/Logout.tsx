import React, { useState, FunctionComponent } from 'react';
import { Button } from 'semantic-ui-react';
import Axios, { AxiosError } from 'axios';
import { User } from '../../User/types';

interface LogoutProps {
  user: string
  callback: (user: User) => void
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
          props.callback({} as User);
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

export default Logout;