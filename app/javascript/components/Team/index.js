import React, { useEffect, useState } from 'react';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import Axios from 'axios';
import { Container } from 'semantic-ui-react';

export default function Team(props) {
  const id = props.match.params.id;
  const [team, setTeam] = useState({
    name: null
  });

  useEffect(() => {
    Axios
      .get(`/api/team/${id}`)
      .then(response => setTeam(response.data))
      .catch(error => toast({
        type: 'error',
        title: 'Error',
        description: error.response.data,
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