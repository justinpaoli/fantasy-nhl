export interface Player {
  person: {
    id: number,
    fullName: string,
    firstName: string,
    lastName: string,
    portrait: string
  },
  jerseyNumber: string,
  position: {
    name: string,
    abbreviation: string
  }
}

export interface PlayerListItemProps {
  player: Player
}

export interface PlayerListProps {
  roster: Player[]
}