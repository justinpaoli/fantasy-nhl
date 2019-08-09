import React, { FunctionComponent } from 'react';
import { Table } from 'semantic-ui-react';
import ActivePlayerListItem from './ActivePlayerListItem';
import { ActivePlayerListProps } from '../types';

const ActivePlayerList: FunctionComponent<ActivePlayerListProps> = ({ players, draftAction, rowSelectAction }) => (
  <Table compact>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Team</Table.HeaderCell>
        <Table.HeaderCell>Points</Table.HeaderCell>
        <Table.HeaderCell>Goals</Table.HeaderCell>
        <Table.HeaderCell>Assists</Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {players.map(player => <ActivePlayerListItem key={player.id} player={player} buttonCallback={draftAction} rowCallback={rowSelectAction} />)}
    </Table.Body>
  </Table>
);


export default ActivePlayerList;