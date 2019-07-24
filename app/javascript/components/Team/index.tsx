import React, { useEffect, useState, FunctionComponent } from 'react';
// @ts-ignore
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import Axios, { AxiosError } from 'axios';
import { Container, Header, Image } from 'semantic-ui-react';
import { TeamProps, TeamWithRoster } from '../Teams/types';
import PlayerList from './PlayerList';

const Team: FunctionComponent<TeamProps> = (props) => {
  const id = props.match.params.id;
  const [team, setTeam] = useState<TeamWithRoster>({
    id: 0,
    name: '',
    logo: '',
    conference: { name: '' },
    division: { name: '' },
    roster: { roster: [] }
  });

  useEffect(() => {
    Axios
      .get(`/api/team/${id}`)
      .then(response => setTeam(response.data))
      .catch((error: AxiosError) => toast({
        type: 'error',
        title: 'Error',
        description: error.response && error.response.data,
        time: 0,
        animation: 'pulse'
      }));
  }, []);

  return (
    <Container>
      <SemanticToastContainer />
      <Header as='h1' textAlign='center'>
        <Image src={team.logo} />
        {team.name}
      </Header>
      <PlayerList roster={team.roster.roster} />
    </Container>
  );
}

export default Team;