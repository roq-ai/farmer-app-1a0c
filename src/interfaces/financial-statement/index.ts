import { FarmInterface } from 'interfaces/farm';
import { GetQueryInterface } from 'interfaces';

export interface FinancialStatementInterface {
  id?: string;
  contract_id: string;
  total_income: number;
  total_expense: number;
  net_income: number;
  statement_date: any;
  farm_id: string;
  created_at?: any;
  updated_at?: any;

  farm?: FarmInterface;
  _count?: {};
}

export interface FinancialStatementGetQueryInterface extends GetQueryInterface {
  id?: string;
  contract_id?: string;
  farm_id?: string;
}
