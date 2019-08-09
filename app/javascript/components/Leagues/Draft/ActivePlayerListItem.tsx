import React, { FunctionComponent } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { ActivePlayerListItemProps } from '../types';

const ActivePlayerListItem: FunctionComponent<ActivePlayerListItemProps> = ({ 
  player,
  buttonCallback,
  rowCallback
}) => {
  const {
    id,
    fullName,
    firstName,
    lastName,
    currentTeam,
    rosterStatus,
    stats: [{
      splits
    }]
  } = player

  const formatPlayerName = () => `${lastName}, ${firstName}`;
  const areStatsAvailable = () => typeof splits[0] !== 'undefined';

  const { points, goals, assists } = areStatsAvailable() ? splits[0].stat : { points: 'N/A', goals: 'N/A', assists: 'N/A'};

  return (
    <Table.Row warning={!areStatsAvailable()} error={rosterStatus === 'I'} onClick={() => rowCallback(player)}>
      <Table.Cell>{formatPlayerName()}</Table.Cell>
      <Table.Cell>{currentTeam.name}</Table.Cell>
      <Table.Cell>{points}</Table.Cell>
      <Table.Cell>{goals}</Table.Cell>
      <Table.Cell>{assists}</Table.Cell>
      <Table.Cell>
        <Button onClick={() => buttonCallback(id)}>Draft</Button>
      </Table.Cell>
    </Table.Row>
  );
}

export default ActivePlayerListItem;