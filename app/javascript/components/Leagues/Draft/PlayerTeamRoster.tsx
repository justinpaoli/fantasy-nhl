import React, { FunctionComponent, Fragment, useState } from 'react';
import ActionCable from 'actioncable';
import { PlayerTeamRosterProps } from '../types';
import { constructWebsocketURL } from '../../../utils/constructWebsocketURL';
import { PlayerTeam } from '../../PlayerTeam/types';
import { Segment, List } from 'semantic-ui-react';

const PlayerTeamRoster: FunctionComponent<PlayerTeamRosterProps> = (props) => {
  const [cable, _setCable] = useState(ActionCable.createConsumer(constructWebsocketURL()));
  const [team, setTeam] = useState(props.team);

  const handleMessageRecieved = (message: PlayerTeam): void => setTeam(message);

  const [_sub, _setSub] = useState(cable.subscriptions.create({
    channel: 'DraftChannel',
    team: props.team.id
  }, {
    connected: () => {},
    disconnected: () => {},
    received: handleMessageRecieved
  }));

  return (
    <Segment.Group>
      <Segment inverted>{team.name}</Segment>
      {team.players && team.players.map(player => <Segment key={player.id}>{player.fullName}</Segment>)}
    </Segment.Group>
  );
};

export default PlayerTeamRoster;