import React, { useEffect, useState } from 'react'
import Axios from 'axios';

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
    <ul>
      {teams.map((team) => (
        <li key={team.id.toString()}>
          <img src={team.logo} width="20" height="20" />
          {team.abbreviation}: {team.name}
        </li>
      ))}
    </ul>
  );
}