import React, { FunctionComponent, Fragment, useState } from 'react';
import { PlayerTeamRosterProps } from '../types';
import { Segment, Table } from 'semantic-ui-react';
import PlayerTeamRosterItem from './PlayerTeamRosterItem';

const StandingsListItem: FunctionComponent<PlayerTeamRosterProps> = ({
  team: {
    name,
    owner,
    score,
    players
  }
}) => {
  const [showRoster, setShowRoster] = useState(false);
  const toggleShowRoster = () => setShowRoster(!showRoster);

  return (
    <Fragment>
      <Segment textAlign='center' onClick={toggleShowRoster}>{name} ({owner}) - {score} point(s)</Segment>
      {showRoster && <Segment>
        <Table compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Team</Table.HeaderCell>
              <Table.HeaderCell>Points</Table.HeaderCell>
              <Table.HeaderCell>Goals</Table.HeaderCell>
              <Table.HeaderCell>Assists</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {players.map(player => <PlayerTeamRosterItem key={player.id} player={player} />)}
          </Table.Body>
        </Table>
      </Segment>}
    </Fragment>
  );
};

export default StandingsListItem;