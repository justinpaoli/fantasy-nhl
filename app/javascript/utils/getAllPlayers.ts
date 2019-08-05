import Axios, { AxiosResponse } from "axios";
import { Player } from "../components/Players/types";

const getAllPlayers = async (): Promise<AxiosResponse<Player[]>> => await Axios.get('/api/players');

export default getAllPlayers;