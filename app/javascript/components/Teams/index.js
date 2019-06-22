import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Segment } from 'semantic-ui-react';

export default function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    Axios
      .get('/api/teams')
      .then(response => {
        setTeams(response.data);
      });
  }, []);
  
  return (
    <div>
      {teams.map((team) => (
        <Segment key={team.id.toString()}>
          <img src={team.logo} width="20" height="20" />
          {team.abbreviation}: {team.name}
        </Segment>
      ))}
    </div>
  );
}