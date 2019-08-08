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
import { Grid, Input } from 'semantic-ui-react';
import { constructWebsocketURL } from '../../../utils/constructWebsocketURL';
import ActionCable from 'actioncable';
import Axios from 'axios';

// TODO: validate that league is in 'draft' state
const Draft: FunctionComponent<DraftProps> = ({ match: { params: { leagueId } } }) => {
  useRequireLoggedIn();

  const [teams, setTeams] = useState<PlayerTeam[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [search, setSearch] = useState('');
  const [undraftedPlayers, setUndraftedPlayers] = useState<Player[]>([]);
  const [visiblePlayers, setVisiblePlayers] = useState<Player[]>([]);

  const [cable, _setCable] = useState(ActionCable.createConsumer(constructWebsocketURL()));

  const handlePlayerDrafted = () => {
    const draftedPlayerIds = flatten(teams.map(team => {
      const playerIds = parsePlayerTeamRoster(team.roster);
      team.players = [];
      playerIds.forEach(id => {
        const draftedPlayer = find(players, player => player.id === id)
        draftedPlayer && team.players.push(draftedPlayer);
      });
      return playerIds;
    }));
    setUndraftedPlayers(players.filter(player => !includes(draftedPlayerIds, player.id)));
  };

  const handleSearch = () => {
    const filter = new RegExp(search, 'i');
    setVisiblePlayers(players.filter(player => filter.test(player.fullName)));
  }

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

  useEffect(handlePlayerDrafted, [players, teams]);
  useEffect(handleSearch, [undraftedPlayers, search])

  const handleDraftButtonClicked = (id: number) => {
    Axios.post(`/api/leagues/${leagueId}/draft`, { player_id: id });
  };

  return (
    <Grid>
      <Grid.Row columns='equal'>
        <Grid.Column>
          <Input icon='search' onChange={e => setSearch(e.target.value)} fluid />
          <ActivePlayerList players={visiblePlayers} draftAction={handleDraftButtonClicked} />
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