import React, { FunctionComponent, Fragment, useState, useEffect } from 'react';
import { DraftProps } from '../types';
import { PlayerTeam } from '../../PlayerTeam/types';
import getLeagueTeamsById from '../../../utils/getLeagueTeamsById';
import getAllPlayers from '../../../utils/getAllPlayers';
import useRequireLoggedIn from '../../../hooks/useRequireLoggedIn';
import PlayerTeamRoster from './PlayerTeamRoster';
import ActivePlayerList from './ActivePlayerList';
import { Player } from '../../Players/types';
import { includes, flatten } from 'lodash';
import parsePlayerTeamRoster from '../../../utils/parsePlayerTeamRoster';
import { Grid } from 'semantic-ui-react';

// TODO: validate that league is in 'draft' state
const Draft: FunctionComponent<DraftProps> = ({ match: { params: { leagueId } } }) => {
  useRequireLoggedIn();

  const [teams, setTeams] = useState<PlayerTeam[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [draftedPlayerIds, setDraftedPlayerIds] = useState<number[]>();
  const [undraftedPlayers, setUndraftedPlayers] = useState<Player[]>([]);

  const updateTeamRosters = () => (
    setDraftedPlayerIds(
      flatten(teams.map((team, i, teams) => {
        const playerIds = parsePlayerTeamRoster(team.roster);
        playerIds.forEach(id => {
          const player = players.filter(player => player.id === id)[0];
          if (!includes(team.players, player)) team.players ? team.players.push(player) : team.players = [player];
        });
        return playerIds;
      }))
    )
  );

  const filterDraftedPlayers = () => (
    setUndraftedPlayers(
      players.filter(player => !includes(draftedPlayerIds, player.id))
    )
  );

  useEffect(() => {
    Promise
      .all([getAllPlayers(), getLeagueTeamsById(leagueId)])
      .then(responses => {
        setPlayers(responses[0].data);
        setTeams(responses[1].data);
      })
  }, []);

  useEffect(() => updateTeamRosters(), [teams]);
  useEffect(() => filterDraftedPlayers(), [players, draftedPlayerIds]);

  return (
    <Grid>
      <Grid.Row columns='equal'>
        <Grid.Column>
          <ActivePlayerList players={undraftedPlayers} />
        </Grid.Column>
        <Grid.Column>
          {teams.map(team => (
            <PlayerTeamRoster key={team.id} team={team} />
          ))}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default Draft;