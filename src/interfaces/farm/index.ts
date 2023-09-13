import { FinancialStatementInterface } from 'interfaces/financial-statement';
import { PurchaseInterface } from 'interfaces/purchase';
import { SaleInterface } from 'interfaces/sale';
import { VisitInterface } from 'interfaces/visit';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface FarmInterface {
  id?: string;
  description?: string;
  location?: string;
  size?: number;
  type?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  financial_statement?: FinancialStatementInterface[];
  purchase?: PurchaseInterface[];
  sale?: SaleInterface[];
  visit?: VisitInterface[];
  user?: UserInterface;
  _count?: {
    financial_statement?: number;
    purchase?: number;
    sale?: number;
    visit?: number;
  };
}

export interface FarmGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  location?: string;
  type?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
