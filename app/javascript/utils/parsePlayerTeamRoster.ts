const parsePlayerTeamRoster = (roster: string): number[] => roster.split(',').map(id => parseInt(id));

export default parsePlayerTeamRoster;