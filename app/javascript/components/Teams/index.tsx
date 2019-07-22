import React, { useEffect, useState } from 'react';
import Axios, { AxiosResponse } from 'axios';
import TeamsTable from './TeamsTable';
import { Team, TeamsTableCardProps } from '../../types/teams';

export default function Teams() {
  const [teams, setTeams] = useState<Array<TeamsTableCardProps>>([{
    data: {
      id: 0,
      name: '',
      logo: '',
      conference: { name: '' },
      division: { name: '' }
    }
  }]);

  useEffect(() => {
    Axios
      .get<Team[]>('/api/teams')
      .then((response: AxiosResponse<Array<Team>>) => handleDataLoaded(response));
  }, []);
  
  const handleDataLoaded: any = ((response: AxiosResponse<Array<Team>>) => {
    setTeams(response.data.map(team => { return { data: team } as TeamsTableCardProps }));
  });

  return (
    <TeamsTable data={teams} />
  );
}