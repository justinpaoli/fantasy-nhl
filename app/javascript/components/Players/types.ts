export interface Player {
  id: number,
  fullName: string,
  firstName: string,
  lastName: string,
  portrait: string,
  rosterStatus: 'Y' | 'I',
  currentTeam: {
    id: number,
    name: string
  },
  primaryPosition: {
    abbreviation: string,
    name: string
  }
  stats: [{
    splits: [{
      stat: {
        points: number,
        assists: number,
        goals: number,
        games: number
      }
    }]
  }]
}