import React, { FunctionComponent } from "react";
import { Table } from "semantic-ui-react";
import { PlayerProps } from "../types";

const PlayerTeamRosterItem: FunctionComponent<PlayerProps> = ({
  player: {  
    fullName,
    currentTeam,
    rosterStatus,
    stats: [{
      splits
    }]
  }
} ) => {
  const areStatsAvailable = () => typeof splits[0] !== 'undefined';
  const { points, goals, assists } = areStatsAvailable() ? splits[0].stat : { points: 0, goals: 0, assists: 0 };

  return (
    <Table.Row warning={!areStatsAvailable()} error={rosterStatus === 'I'}>
      <Table.Cell>{fullName}</Table.Cell>
      <Table.Cell>{currentTeam.name}</Table.Cell>
      <Table.Cell>{points}</Table.Cell>
      <Table.Cell>{goals}</Table.Cell>
      <Table.Cell>{assists}</Table.Cell>
    </Table.Row>
  );
}

export default PlayerTeamRosterItem;