import React, { FunctionComponent, useState, useEffect } from 'react';
import { CreateTeamProps, PlayerTeam } from './types';
import useFormInputData from '../../hooks/useFormInputData';
import Axios from 'axios';
import useRouter from 'use-react-router';
import ContainerCenteredVertical from '../common/ContainerCenteredVertical';
import { Header, Divider, Form, Button, Icon } from 'semantic-ui-react';
import { League } from '../Leagues/types';
import getLeagueById from '../../utils/getLeagueById';

const CreateTeamForm: FunctionComponent<CreateTeamProps> = (props) => {
  const leagueId = props.match.params.leagueId;
  const [league, setLeague] = useState({ name: 'skrrr' } as League);
  const { history } = useRouter();
  const {
    state, setState,
    fields: [name],
    setters: [setName]
  } = useFormInputData(1);

  useEffect(() => {
    getLeagueById(leagueId).then(response => setLeague(response.data));
  }, [])

  const handleSubmit = () => {
    return () => {
      setState('loading');
      Axios
        .post<PlayerTeam>('/api/player_teams', {
          player_team: {
            // @ts-ignore
            user_id: gon.global.user.id,
            league_id: leagueId,
            name: name,
            roster: ''
          }
        })
        .then(response => {
          setState('default');
          history.push(`/player_teams/${response.data.id}`);
        });
    }
  }

  return (
    <ContainerCenteredVertical>
      <Header icon='trophy' content='Create Team' />
      <Divider />
      <Form loading={state === 'loading'} error={state === 'error'} autoComplete='off'>
        <Form.Input label='League name' name='leagueName' value={league.name} disabled />
        <Form.Input label='Team name' name='name' onChange={e => setName(e.target.value)} />
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

export default CreateTeamForm;