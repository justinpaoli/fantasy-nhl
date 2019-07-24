import React, { FunctionComponent } from 'react';
import { Card } from 'semantic-ui-react';
import TeamsTableCard from './TeamsTableCard';
import { TeamsTableProps } from './types';

const TeamsTable: FunctionComponent<TeamsTableProps> = ({ data }) => (
  <Card.Group itemsPerRow={3} doubling stackable>
    {data.map((team) => <TeamsTableCard key={team.data.id.toString()} data={team.data} />)}
  </Card.Group>
);

export default TeamsTable;