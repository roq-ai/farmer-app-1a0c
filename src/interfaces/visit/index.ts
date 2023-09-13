import { FarmInterface } from 'interfaces/farm';
import { GetQueryInterface } from 'interfaces';

export interface VisitInterface {
  id?: string;
  salesperson_name: string;
  visit_date: any;
  purpose: string;
  notes?: string;
  farm_id: string;
  created_at?: any;
  updated_at?: any;

  farm?: FarmInterface;
  _count?: {};
}

export interface VisitGetQueryInterface extends GetQueryInterface {
  id?: string;
  salesperson_name?: string;
  purpose?: string;
  notes?: string;
  farm_id?: string;
}
