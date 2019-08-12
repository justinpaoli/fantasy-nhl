import React, { FunctionComponent, useEffect, useState } from 'react';
import { LeagueIdProps } from '../types';
import { Segment, Container } from 'semantic-ui-react';
import { PlayerTeam } from '../../PlayerTeam/types';
import getLeagueTeamsById from '../../../utils/getLeagueTeamsById';
import StandingsListItem from './StandingsListItem';

const Standings: FunctionComponent<LeagueIdProps> = ({ match: { params: { leagueId } } }) => {
  const [teams, setTeams] = useState<PlayerTeam[]>([]);
  useEffect(() => {
    getLeagueTeamsById(leagueId).then(response => setTeams(response.data))
  }, []);

  return (
    <Container>
      <Segment.Group>
        {teams.map(team => (
          <StandingsListItem key={team.id} team={team} />
        ))}
      </Segment.Group>
    </Container>
  );
}

export default Standings;