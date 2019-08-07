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

export interface DraftProps extends RouteComponentProps<{leagueId: string}> {}

export interface PlayerTeamRosterProps {
  team: PlayerTeam;
}

export interface ActivePlayerListProps {
  players: Player[],
  draftAction: (id: number) => void
}

export interface ActivePlayerListItemProps {
  player: Player,
  callback: (id: number) => void
}