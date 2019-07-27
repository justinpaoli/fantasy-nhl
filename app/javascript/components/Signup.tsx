import React, { FunctionComponent } from 'react';
import useFormInputData from '../hooks/useFormInputData';
import useRequireLoggedOut from '../hooks/useRequireLoggedOut';
import ContainerCenteredVertical from './common/ContainerCenteredVertical';
import { Header, Divider, Form, Button, Icon } from 'semantic-ui-react';
import Axios, { AxiosError } from 'axios';
import ErrorMessage from './common/ErrorMessage';
import useRouter from 'use-react-router';
import { startCase } from 'lodash';

const Signup: FunctionComponent = () => {
  const { history } = useRouter();
  useRequireLoggedOut();
  
  const {
    state, setState,
    fields: [username, password, confirmation],
    setters: [setUsername, setPassword, setConfirmation],
    errorMsgs, setErrorMsgs
  } = useFormInputData(3);

  const handleSubmit = () => {
    return () => {
      setState('loading');
      Axios
        .post('api/users', {
          user: {
            username: username,
            password: password,
            password_confirmation: confirmation
          }
        })
        .then((response) => {
          setState('default');
          // @ts-ignore
          gon.global.user = response.data.user;
          history.push('/');
        })
        .catch((error: AxiosError) => {
          if (!error.response) return;
          const data: any = error.response.data;
          const errors: string[] = [];
          Object.keys(data).forEach(property => {
            const formattedProperty: string = startCase(property);
            const message: string = data[property];
            errors.push(formattedProperty + ": " + message)
          });

          setErrorMsgs(errors);
          setState('error');
        });
    };
  }

  return (
    <ContainerCenteredVertical>
      <Header icon='clipboard outline' content='Signup' />
      <Divider />
      <Form loading={state === 'loading'} error={state === 'error'} autoComplete='off'>
        <ErrorMessage header='Registration Failed' errorMsgs={errorMsgs} />
        <Form.Input label='Username' name='username' onChange={e => setUsername(e.target.value)} />
        <Form.Input label='Password' name='password' type='password' onChange={e => setPassword(e.target.value)} />
        <Form.Input label='Confirm Password' name='confirmation' type='password' onChange={e => setConfirmation(e.target.value)} />
        <Form.Button color='green' onClick={handleSubmit()} animated>
          <Button.Content visible>Signup</Button.Content>
          <Button.Content hidden>
            <Icon name='clipboard check' />
          </Button.Content>
        </Form.Button>
      </Form>
    </ContainerCenteredVertical>
  );
}

export default Signup;