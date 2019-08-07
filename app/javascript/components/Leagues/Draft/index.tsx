import React, { FunctionComponent, useState, useEffect } from 'react';
import { DraftProps } from '../types';
import { PlayerTeam } from '../../PlayerTeam/types';
import getLeagueTeamsById from '../../../utils/getLeagueTeamsById';
import getAllPlayers from '../../../utils/getAllPlayers';
import useRequireLoggedIn from '../../../hooks/useRequireLoggedIn';
import PlayerTeamRoster from './PlayerTeamRoster';
import ActivePlayerList from './ActivePlayerList';
import { Player } from '../../Players/types';
import { includes, flatten, find } from 'lodash';
import parsePlayerTeamRoster from '../../../utils/parsePlayerTeamRoster';
import { Grid } from 'semantic-ui-react';
import { constructWebsocketURL } from '../../../utils/constructWebsocketURL';
import ActionCable from 'actioncable';

// TODO: validate that league is in 'draft' state
const Draft: FunctionComponent<DraftProps> = ({ match: { params: { leagueId } } }) => {
  useRequireLoggedIn();

  const [teams, setTeams] = useState<PlayerTeam[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [undraftedPlayers, setUndraftedPlayers] = useState<Player[]>([]);

  const [cable, _setCable] = useState(ActionCable.createConsumer(constructWebsocketURL()));

  const handlePlayerDrafted = () => {
    const draftedPlayerIds = flatten(teams.map(team => {
      const playerIds = parsePlayerTeamRoster(team.roster);
      playerIds.forEach(id => {
        const draftedPlayer = find(players, player => player.id === id)
        draftedPlayer && (team.players ? team.players.push(draftedPlayer) : team.players = [draftedPlayer]);
      });
      return playerIds;
    }));
    setUndraftedPlayers(players.filter(player => !includes(draftedPlayerIds, player.id)));
  };

  useEffect(() => {
    Promise
      .all([getAllPlayers(), getLeagueTeamsById(leagueId)])
      .then(responses => {
        setPlayers(responses[0].data);
        setTeams(responses[1].data);
      });

    cable.subscriptions.create({
      channel: 'DraftChannel',
      league: leagueId
    }, {
      connected: () => {},
      disconnected: () => {},
      received: setTeams
    })
  }, []);

  useEffect(handlePlayerDrafted, [players, teams])

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