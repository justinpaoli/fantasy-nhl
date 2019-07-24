import { Player } from "../Team/types";
import { RouteComponentProps } from "react-router";

export interface Team {
  id: number,
  name: string,
  logo: string,
  conference: { name: string },
  division: { name: string }
}

export interface TeamWithRoster extends Team {
  roster: {
    roster: Array<Player>
  }
}

export interface TeamProps extends RouteComponentProps<{id: string}> {};

export interface TeamsTableCardProps {
  data: Team
}

export interface TeamsTableProps {
  data: Array<TeamsTableCardProps>
}