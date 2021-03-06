import React, { useEffect, useState, FunctionComponent } from 'react';
import Axios, { AxiosResponse } from 'axios';
import TeamsTable from './TeamsTable';
import { Team, TeamsTableCardProps } from './types';
import SubMenuFilter from '../common/SubMenuFilter';
import { SubMenuFilterItem, SubMenuFilterFilter } from '../common/SubMenuFilter/types';
import { Container, Header, Divider } from 'semantic-ui-react';
import { get } from 'lodash';

const Teams: FunctionComponent = () => {
  const MENU_STRUCTURE: SubMenuFilterItem[] = [
    new SubMenuFilterItem('Eastern', 'Eastern Conference', { colour: 'red', children: [
      new SubMenuFilterItem('Atlantic', 'Atlantic Divison', { property: 'division.name', colour: 'orange' }),
      new SubMenuFilterItem('Metropolitan', 'Metropolitan Divison', { property: 'division.name', colour: 'orange' })
    ]}), 
    new SubMenuFilterItem('West', 'Western Conference', { colour: 'violet', children: [
      new SubMenuFilterItem('Central', 'Central Divison', { property: 'division.name', colour: 'blue' }),
      new SubMenuFilterItem('Pacific', 'Pacific Divison', { property: 'division.name', colour: 'blue' })
    ]})
  ]
  
  const [teams, setTeams] = useState<TeamsTableCardProps[]>([]);
  const [visibleTeams, setVisibleTeams] = useState<TeamsTableCardProps[]>([]);
  const [filters, setFilters] = useState<SubMenuFilterFilter[]>([]);

  useEffect(() => {
    Axios
      .get('/api/teams')
      .then(handleDataLoaded);
  }, []);

  useEffect(() => parseFilters(), [teams, filters]);
  
  const handleDataLoaded = (response: AxiosResponse<Array<Team>>): void => setTeams(response.data.map(team => ({ data: team } as TeamsTableCardProps )));

  const handeFiltersChanged = (newFilters: SubMenuFilterFilter[]): void => setFilters(newFilters); 

  const parseFilters = (): void => (
    setVisibleTeams(
      filters.length 
        ? teams.filter(team => filters.filter(filter => get(team.data, filter.property) === filter.value).length > 0) 
        : teams
    )
  );

  return (
    <div>
      <Container textAlign='center'>
        <Header as='h1'>Teams currently in the NHL</Header>
        <br />
        <SubMenuFilter structure={MENU_STRUCTURE} onChange={handeFiltersChanged} label='Filter:' />
      </Container>
      <br />
      <Container>
         <Divider />
        <TeamsTable data={visibleTeams} />
      </Container>
    </div>
  );
}

export default Teams;