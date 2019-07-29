import React, { FunctionComponent, useState, useEffect } from 'react';
import Axios from 'axios';
import useFormInputData from '../../hooks/useFormInputData';
import useRequireLoggedIn from '../../hooks/useRequireLoggedIn';
import ContainerCenteredVertical from '../common/ContainerCenteredVertical';
import { Header, Divider, Form, Button, Icon, Input, Grid, Checkbox } from 'semantic-ui-react';
import { LeagueRules } from './types';
import getCurrentSeason from '../../utils/getCurrentSeason';
import useRouter from 'use-react-router';

const CreateLeagueForm: FunctionComponent = () => {
  useRequireLoggedIn();

  const [season, setSeason] = useState('');
  const { history } = useRouter();
  const {
    state, setState,
    fields: [
      name, 
      goalValue, 
      assistValue,
      allowGoalies,
      maxGoaliesPerTeam,
      goalieWinValue,
      goalieShutoutValue
    ],
    setters: [
      setName, 
      setGoalValue, 
      setAssistValue,
      setAllowGoalies,
      setMaxGoaliesPerTeam,
      setGoalieWinValue,
      setGoalieShutoutValue
    ]
  } = useFormInputData(7);

  useEffect(() => {
    getCurrentSeason().then(response => setSeason(response.data));
    setAllowGoalies(false);
  }, []);

  const stringifyRules = (): string => {
    const rules = {
      goalValue: goalValue,
      assistValue: assistValue,
      allowGoalies: allowGoalies
    } as LeagueRules;
    if (allowGoalies) rules.goalieRules = {
      maxGoaliesPerTeam: maxGoaliesPerTeam,
      goalieWinValue: goalieWinValue,
      goalieShutoutValue: goalieShutoutValue
    };

    return JSON.stringify(rules);
  };

  const handleSubmit = () => {
    return () => {
      setState('loading');
      Axios
        .post('/api/leagues', {
          league: {
            // @ts-ignore
            owner: gon.global.user.id,
            state: 'created',
            name: name,
            season: season,
            rules: stringifyRules(),
            team_ids: ''
          }
        })
        .then(_response => {
          setState('default');
          history.push('/leagues');
        });
    }
  }

  return (
    <ContainerCenteredVertical>
      <Header icon='trophy' content='Create League' />
      <Divider />
      <Form loading={state === 'loading'} error={state === 'error'} autoComplete='off'>
        <Form.Input label='League name' name='name' onChange={e => setName(e.target.value)} />
        <Header as='h4' content='Rules' />
        <Grid stackable>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Input label='Points per goal' type='number' name='goalValue' onChange={e => setGoalValue(e.target.value)} fluid />
            </Grid.Column>
            <Grid.Column>
              <Input label='Points per assist' type='number' name='assistValue' onChange={e => setAssistValue(e.target.value)} fluid />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns='equal'>
            <Grid.Column width={2}>
              <Checkbox label='Allow goalies?' name='allowGoalies' onChange={(_e, { checked }) => setAllowGoalies(checked)} />
            </Grid.Column>
            <Grid.Column>
              <Input label='Goalies per team' type='number' name='maxGoaliesPerTeam' onChange={e => setMaxGoaliesPerTeam(e.target.value)} disabled={!allowGoalies} fluid />
            </Grid.Column>
            <Grid.Column>
              <Input label='Points per win' type='number' name='goalieWinValue' onChange={e => setGoalieWinValue(e.target.value)} disabled={!allowGoalies} fluid />
            </Grid.Column>
            <Grid.Column>
              <Input label='Shutout bonus' type='number' name='goalieShutoutValue' onChange={e => setGoalieShutoutValue(e.target.value)} disabled={!allowGoalies} fluid />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Form.Button color='blue' onClick={handleSubmit()} animated>
          <Button.Content visible>Create</Button.Content>
          <Button.Content hidden>
            <Icon name='arrow alternate circle right' />
          </Button.Content>
        </Form.Button>
      </Form>
    </ContainerCenteredVertical>
  );
}

export default CreateLeagueForm;