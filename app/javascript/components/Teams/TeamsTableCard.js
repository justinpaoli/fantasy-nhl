import React from 'react';
import { Transition, Image, Card } from 'semantic-ui-react';

export default function TeamsTableRow(props) {
  const team = props.team;
  
  return (
    <Transition animation='pulse' duration={0.5}>
    <Card href={`/team/${team.abbreviation}`}>
      <Card.Content>
        <Image floated='right' size='tiny' src={team.logo} />
        <Card.Header>{team.name}</Card.Header>
        <Card.Description>
          {team.conference.name} Conference<br /> 
          {team.division.name} Division
        </Card.Description>
      </Card.Content>
    </Card>
    </Transition>
  );
}