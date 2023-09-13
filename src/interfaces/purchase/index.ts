import { FarmInterface } from 'interfaces/farm';
import { GetQueryInterface } from 'interfaces';

export interface PurchaseInterface {
  id?: string;
  product_name: string;
  quantity: number;
  price: number;
  purchase_date: any;
  supplier: string;
  farm_id: string;
  created_at?: any;
  updated_at?: any;

  farm?: FarmInterface;
  _count?: {};
}

export interface PurchaseGetQueryInterface extends GetQueryInterface {
  id?: string;
  product_name?: string;
  supplier?: string;
  farm_id?: string;
}
