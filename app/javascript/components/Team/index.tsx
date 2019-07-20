import React, { useEffect, useState, FunctionComponent } from 'react';
// @ts-ignore
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import Axios, { AxiosError } from 'axios';
import { Container } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router';

interface TeamProps extends RouteComponentProps<{id: string}> {};

const Team: FunctionComponent<TeamProps> = (props) => {
  const id = props.match.params.id;
  const [team, setTeam] = useState({
    name: null
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
      {team.name}
    </Container>
  );
}

export default Team;