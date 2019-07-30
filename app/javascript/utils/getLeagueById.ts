import { League } from "../components/Leagues/types";
import Axios, { AxiosResponse } from "axios";

const getLeagueById = async (id: string): Promise<AxiosResponse<League>> => await Axios.get(`/api/leagues/${id}`);

export default getLeagueById;