import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import Axios from 'axios';

export default withRouter(function Logout(props) {
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    return () => {
      setLoading(true);
      Axios
        .delete('/logout')
        .then(_response => {
          setLoading(false);
          gon.global.user = null;
          props.history.push('/');
        })
        .catch(_error => {
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
});