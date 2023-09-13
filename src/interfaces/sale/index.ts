import { FarmInterface } from 'interfaces/farm';
import { GetQueryInterface } from 'interfaces';

export interface SaleInterface {
  id?: string;
  product_name: string;
  quantity: number;
  price: number;
  sale_date: any;
  buyer: string;
  farm_id: string;
  created_at?: any;
  updated_at?: any;

  farm?: FarmInterface;
  _count?: {};
}

export interface SaleGetQueryInterface extends GetQueryInterface {
  id?: string;
  product_name?: string;
  buyer?: string;
  farm_id?: string;
}
