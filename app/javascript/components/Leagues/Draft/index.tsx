import React, { FunctionComponent, Fragment, useState, useEffect } from 'react';
import { DraftProps } from '../types';
import { PlayerTeam } from '../../PlayerTeam/types';
import getLeagueTeamsById from '../../../utils/getLeagueTeamsById';
import useRequireLoggedIn from '../../../hooks/useRequireLoggedIn';
import PlayerTeamRoster from './PlayerTeamRoster';

// TODO: validate that league is in 'draft' state
const Draft: FunctionComponent<DraftProps> = (props) => {
  useRequireLoggedIn();
  const [teams, setTeams] = useState<PlayerTeam[]>([]);

  useEffect(() => {
    getLeagueTeamsById(props.match.params.leagueId).then(response => setTeams(response.data));
  }, []);

  // TODO: Strong type this
  const handleRecievedMessage = (response: any) => {
    console.log(response);
  }

  return (
    <Fragment>
      {teams.map(team => (
        <PlayerTeamRoster key={team.id} team={team} />
      ))}
    </Fragment>
  )
}

export default Draft;