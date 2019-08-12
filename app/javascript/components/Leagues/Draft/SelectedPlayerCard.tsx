import React, { FunctionComponent } from 'react';
import { PlayerProps } from '../types';
import { Card, Image } from 'semantic-ui-react';

const SelectedPlayerCard: FunctionComponent<PlayerProps> = ({ 
  player: {
    fullName,
    portrait,
    currentTeam,
    stats: [{
      splits: [{
        stat: {
          points,
          goals,
          assists,
          games
        }
      }]
    }],
    primaryPosition
  }
 }) => (
  <Card>
    <Image src={portrait} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{fullName}</Card.Header>
      <Card.Meta>{primaryPosition.name}, {currentTeam.name}</Card.Meta>
      <Card.Description>
        Points: {points} ({goals} G, {assists} A) in {games} Games
      </Card.Description>
    </Card.Content>
  </Card>
);

export default SelectedPlayerCard;