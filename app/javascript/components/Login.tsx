import React, { FunctionComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Header, Form, Button, Icon, Message, Divider, Segment } from 'semantic-ui-react';
import Axios, { AxiosError } from 'axios';
import useFormInputData from '../hooks/useFormInputData';
import useRequireLoggedOut from '../hooks/useRequireLoggedOut';
import ContainerCenteredVertical from './common/ContainerCenteredVertical';
import ErrorMessage from './common/ErrorMessage';

const Login: FunctionComponent<RouteComponentProps> = (props) => {
  useRequireLoggedOut(props);

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

export default withRouter(Login);