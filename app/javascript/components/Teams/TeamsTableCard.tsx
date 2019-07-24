import React, { FunctionComponent } from 'react';
import { Image, Card } from 'semantic-ui-react';
import { TeamsTableCardProps } from './types';

const TeamsTableCard: FunctionComponent<TeamsTableCardProps> = ({ data: { id, name, logo, conference, division } }) => {  
  return (
    <Card href={`/team/${id}`}>
      <Card.Content>
        <Image floated='right' size='tiny' src={logo} />
        <Card.Header>{name}</Card.Header>
        <Card.Description>
          {conference.name} Conference<br /> 
          {division.name} Division
        </Card.Description>
      </Card.Content>
    </Card>
  );
}

export default TeamsTableCard;