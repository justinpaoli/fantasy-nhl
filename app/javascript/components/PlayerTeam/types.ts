import { RouteComponentProps } from "react-router";

export interface CreateTeamProps extends RouteComponentProps<{leagueId: string}> {}

export interface PlayerTeam {
  id: number
  league_id: number,
  user_id: number,
  name: string,
  roster: string
}