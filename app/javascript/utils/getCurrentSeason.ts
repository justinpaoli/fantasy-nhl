import Axios, { AxiosResponse } from "axios";

const getCurrentSeason = async (): Promise<AxiosResponse<string>> => await Axios.get('/api/seasons/current');

export default getCurrentSeason;