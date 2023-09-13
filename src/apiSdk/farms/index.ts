import axios from 'axios';
import queryString from 'query-string';
import { FarmInterface, FarmGetQueryInterface } from 'interfaces/farm';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getFarms = async (query?: FarmGetQueryInterface): Promise<PaginatedInterface<FarmInterface>> => {
  const response = await axios.get('/api/farms', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createFarm = async (farm: FarmInterface) => {
  const response = await axios.post('/api/farms', farm);
  return response.data;
};

export const updateFarmById = async (id: string, farm: FarmInterface) => {
  const response = await axios.put(`/api/farms/${id}`, farm);
  return response.data;
};

export const getFarmById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/farms/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFarmById = async (id: string) => {
  const response = await axios.delete(`/api/farms/${id}`);
  return response.data;
};
