import React, { FunctionComponent } from 'react';
import { Container, Header, Card } from 'semantic-ui-react';
import TeamsTableCard from './TeamsTableCard';
import { TeamsTableProps } from './types';

const TeamsTable: FunctionComponent<TeamsTableProps> = ({ data }) => {
  return (
    <Container>
      <Header as='h1' textAlign='center'>Teams currently in the NHL</Header>
        <Card.Group itemsPerRow={3} doubling stackable>
          {data.map((team) => <TeamsTableCard key={team.data.id.toString()} data={team.data} />)}
        </Card.Group>
    </Container>
  );
};

export default TeamsTable;