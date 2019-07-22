import React, { FunctionComponent } from 'react';
import { PlayerListProps } from '../../types/players';
import { List } from 'semantic-ui-react';
import PlayerListItem from './PlayerListItem';

const PlayerList: FunctionComponent<PlayerListProps> = ({ roster }) => (
  <List divided relaxed>
    {roster.map(player => <PlayerListItem key={player.person.id.toString()} player={player} />)}
  </List>
);

export default PlayerList;