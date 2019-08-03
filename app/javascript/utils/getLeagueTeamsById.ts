import Axios, { AxiosResponse } from "axios";
import { PlayerTeam } from "../components/PlayerTeam/types";

const getLeagueTeamsById = async (id: string): Promise<AxiosResponse<PlayerTeam[]>> => await Axios.get(`/api/leagues/${id}/teams`);

export default getLeagueTeamsById;