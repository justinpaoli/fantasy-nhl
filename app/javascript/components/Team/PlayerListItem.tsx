import React, { FunctionComponent } from 'react';
import { PlayerListItemProps } from '../../types/players';
import { List, Image } from 'semantic-ui-react';

const PlayerListItem: FunctionComponent<PlayerListItemProps> = ({ 
  player: {
    person: {
      fullName,
      portrait
    },
    jerseyNumber,
    position
  } 
}) => (
  <List.Item>
    <Image avatar src={portrait} />
    <List.Content>
      <List.Header as='h4'>{fullName}</List.Header>
      <List.Description>{position.name} - #{jerseyNumber}</List.Description>
    </List.Content>
  </List.Item>
);

export default PlayerListItem;