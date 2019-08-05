import { RouteComponentProps } from "react-router";
import { Player } from "../Players/types";

export interface CreateTeamProps extends RouteComponentProps<{leagueId: string}> {}

export interface PlayerTeam {
  id: number
  league_id: number,
  user_id: number,
  name: string,
  roster: string
  players: Player[];
}