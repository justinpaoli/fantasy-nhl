export interface TeamApiResponse {
    id: number,
    name: string,
    logo: string,
    conference: { name: string },
    division: { name: string }
  }

  export interface TeamsTableCardProps {
    data: TeamApiResponse
  }

  export interface TeamsTableProps {
    data: Array<TeamsTableCardProps>
  }