import React from 'react';
import { Container, Header, Card } from 'semantic-ui-react';
import TeamsTableCard from './TeamsTableCard';

export default function TeamsTable(props) {
  const teams = props.data;

  return (
    <Container>
      <Header as='h1' textAlign='center'>Teams currently in the NHL</Header>
        <Card.Group itemsPerRow={3} doubling stackable>
          {teams.map((team) => (
            <TeamsTableCard key={team.id.toString()} team={team} />
          ))}
        </Card.Group>
    </Container>
  );
}