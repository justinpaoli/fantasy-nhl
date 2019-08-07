import React, { FunctionComponent} from 'react';
import { PlayerTeamRosterProps } from '../types';
import { Segment } from 'semantic-ui-react';

const PlayerTeamRoster: FunctionComponent<PlayerTeamRosterProps> = ({ team }) => (
  <Segment.Group>
    <Segment inverted>{team.name}</Segment>
    {team.players && team.players.map(player => <Segment key={player.id}>{player.fullName}</Segment>)}
  </Segment.Group>
);

export default PlayerTeamRoster;