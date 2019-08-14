import React, { FunctionComponent, useState, useEffect } from 'react';
import { LeagueIdProps } from '../types';
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
import SelectedPlayerCard from './SelectedPlayerCard';
import SelectedPlayerPlaceholder from './SelectedPlayerPlaceholder';
import getLeagueById from '../../../utils/getLeagueById';
import Queue from './Queue';

// TODO: validate that league is in 'draft' state
const Draft: FunctionComponent<LeagueIdProps> = ({ match: { params: { leagueId } } }) => {
  useRequireLoggedIn();

  const [leagueState, setLeagueState] = useState('draft');
  const [teams, setTeams] = useState<PlayerTeam[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [search, setSearch] = useState('');
  const [undraftedPlayers, setUndraftedPlayers] = useState<Player[]>([]);
  const [visiblePlayers, setVisiblePlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player>();

  const [cable, _setCable] = useState(ActionCable.createConsumer(constructWebsocketURL()));

  const handlePlayerDrafted = () => {
    const draftedPlayerIds = flatten(teams.map(team => parsePlayerTeamRoster(team.roster)));
    setUndraftedPlayers(players.filter(player => !includes(draftedPlayerIds, player.id)));
  };

  const handleSearch = () => {
    const filter = new RegExp(search, 'i');
    setVisiblePlayers(undraftedPlayers.filter(player => filter.test(player.fullName)));
  }

  useEffect(() => {
    Promise
      .all([getAllPlayers(), getLeagueTeamsById(leagueId), getLeagueById(leagueId)])
      .then(responses => {
        setPlayers(responses[0].data);
        setTeams(responses[1].data);
        setLeagueState(responses[2].data.state);
      });

    cable.subscriptions.create({
      channel: 'DraftChannel',
      league: leagueId
    }, {
      connected: () => {},
      disconnected: () => {},
      received: message => {
        setTeams(message.teams)
        setLeagueState(message.state)
      }
    })
  }, []);

  useEffect(handlePlayerDrafted, [players, teams]);
  useEffect(handleSearch, [undraftedPlayers, search])

  const handleDraftButtonClicked = (id: number) => {
    Axios.post(`/api/leagues/${leagueId}/draft`, { player_id: id });
  };

  const handlePlayerRowClicked = (player: Player) => setSelectedPlayer(player);

  return (
    <Grid padded>
      <Grid.Row columns={1}>
        <Grid.Column>
          <Queue state={leagueState} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column>
          <Input icon='search' onChange={e => setSearch(e.target.value)} fluid />
          <ActivePlayerList players={visiblePlayers} rowSelectAction={handlePlayerRowClicked} draftAction={handleDraftButtonClicked} />
        </Grid.Column>
        <Grid.Column>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                {teams.map(team => (
                  <PlayerTeamRoster key={team.id} team={team} />
                ))}
              </Grid.Column>
              <Grid.Column>
                {selectedPlayer ? <SelectedPlayerCard player={selectedPlayer} /> : <SelectedPlayerPlaceholder />}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default Draft;