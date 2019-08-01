import React, { FunctionComponent, useContext } from 'react';
import { Header, Form, Button, Icon, Divider } from 'semantic-ui-react';
import Axios, { AxiosError } from 'axios';
import useFormInputData from '../hooks/useFormInputData';
import useRequireLoggedOut from '../hooks/useRequireLoggedOut';
import ContainerCenteredVertical from './common/ContainerCenteredVertical';
import ErrorMessage from './common/ErrorMessage';
import useRouter from 'use-react-router';
import { UserContext } from './User/UserProvider';
import { User } from './User/types';

const Login: FunctionComponent = () => {
  const { history } = useRouter();
  const { updateUser } = useContext(UserContext);
  useRequireLoggedOut();

  const { 
    state, setState, 
    fields: [username, password], 
    setters: [setUsername, setPassword], 
    errorMsgs, setErrorMsgs 
  } = useFormInputData(2);

  const handleSubmit = () => {
    return () => {
      setState('loading');
      Axios
        .post('/login', {
          auth: {
            username: username,
            password: password
          }
        })
        .then((response) => {
          setState('default');
          updateUser({
            username: username,
            jwt: response.data.jwt
          } as User);
          history.push('/');
        })
        .catch((error: AxiosError) => {
          if (!error.response) return;
          setErrorMsgs([error.response.data]);
          setState('error');
        });
    };
  }
  
  return (
    <ContainerCenteredVertical>
      <Header icon='lock' content='Login' />
      <Divider />
      <Form loading={state === 'loading'} error={state === 'error'} autoComplete='off'>
      <ErrorMessage header='Registration Failed' errorMsgs={errorMsgs} />
        <Form.Input label='Username' name='username' onChange={e => setUsername(e.target.value)} />
        <Form.Input label='Password' name='password' type='password' onChange={e => setPassword(e.target.value)} />
        <Form.Button color='green' onClick={handleSubmit()} animated>
          <Button.Content visible>Login</Button.Content>
          <Button.Content hidden>
            <Icon name='unlock' />
          </Button.Content>
        </Form.Button>
      </Form>
    </ContainerCenteredVertical>
  );
};

export default Login;