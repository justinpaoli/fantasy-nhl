import React, { useEffect, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Container, Header, Form, Button, Icon, Message, Divider, Segment } from 'semantic-ui-react';
import Axios, { AxiosError } from 'axios';

const Login = (props: RouteComponentProps) => {
  const [state, setState] = useState('default');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = () => {
    return () => {
      setState('loading');
      Axios
        .post('/login', {
          username: username,
          password: password
        })
        .then((response) => {
          setState('default');
          // @ts-ignore
          gon.global.user = response.data.user;
          props.history.push('/');
        })
        .catch((error: AxiosError) => {
          setErrorMsg(error.response && error.response.data);
          setState('error');
        });
    };
  }

  //Redirect to Home if already logged in
  useEffect(() => {
    // @ts-ignore
    if (gon.global.user) props.history.push('/');
  }, []);
  
  return (
    <Container as={Segment} style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)'
    }}>
      <Header icon='lock' content='Login' />
      <Divider />
      <Form loading={state === 'loading'} error={state === 'error'}>
        <Message error header='Login Failed' content={errorMsg} />
        <Form.Input label='Username' name='username' onChange={e => setUsername(e.target.value)} />
        <Form.Input label='Password' name='password' type='password' onChange={e => setPassword(e.target.value)} />
        <Form.Button color='green' onClick={handleSubmit()} animated>
          <Button.Content visible>Login</Button.Content>
          <Button.Content hidden>
            <Icon name='unlock' />
          </Button.Content>
        </Form.Button>
      </Form>
    </Container>
  );
};

export default withRouter(Login);