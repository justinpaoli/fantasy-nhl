import React, { useEffect, useState } from 'react';
import Axios from 'axios';

export default function Team(props) {
  const id = props.match.params.id;
  const [team, setTeam] = useState({
    name: null
  });

  useEffect(() => {
    Axios
      .get(`/api/team/${id}`)
      .then(response => setTeam(response.data));
  }, []);

  return (
    <div>{team.name}</div>
  );
}