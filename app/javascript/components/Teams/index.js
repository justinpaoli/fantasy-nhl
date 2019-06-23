import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import TeamsTable from './TeamsTable';

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
      <TeamsTable data={teams}/>
    </div>
  );
}