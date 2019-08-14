import { RouteComponentProps } from 'react-router';
import { Player } from '../Players/types'
import { PlayerTeam } from '../PlayerTeam/types';

export interface League {
  owner: number,
  state: string,
  name: string,
  season: string,
  rules: LeagueRules
}

export interface LeagueRules {
  goalValue: number,
  assistValue: number,
  
  allowGoalies: boolean,
  goalieRules?: {
    maxGoaliesPerTeam: number,
    goalieWinValue: number,
    goalieShutoutValue: number
  }
}

export interface LeagueIdProps extends RouteComponentProps<{leagueId: string}> {}

export interface PlayerProps {
  player: Player
}

export interface PlayerTeamRosterProps {
  team: PlayerTeam;
}

export interface ActivePlayerListProps {
  players: Player[],
  draftAction: (id: number) => void,
  rowSelectAction: (player: Player) => void
}

export interface ActivePlayerListItemProps extends PlayerProps {
  buttonCallback: (id: number) => void,
  rowCallback: (player: Player) => void
}

export interface QueueProps {
  state: string
}
