import axios from 'axios';
import queryString from 'query-string';
import { FinancialStatementInterface, FinancialStatementGetQueryInterface } from 'interfaces/financial-statement';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getFinancialStatements = async (
  query?: FinancialStatementGetQueryInterface,
): Promise<PaginatedInterface<FinancialStatementInterface>> => {
  const response = await axios.get('/api/financial-statements', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createFinancialStatement = async (financialStatement: FinancialStatementInterface) => {
  const response = await axios.post('/api/financial-statements', financialStatement);
  return response.data;
};

export const updateFinancialStatementById = async (id: string, financialStatement: FinancialStatementInterface) => {
  const response = await axios.put(`/api/financial-statements/${id}`, financialStatement);
  return response.data;
};

export const getFinancialStatementById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/financial-statements/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFinancialStatementById = async (id: string) => {
  const response = await axios.delete(`/api/financial-statements/${id}`);
  return response.data;
};
