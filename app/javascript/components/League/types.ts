export interface League {
  owner: number,
  state: string,
  name: string,
  season: string,
  rules: LeagueRules,
  teamIds: string
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