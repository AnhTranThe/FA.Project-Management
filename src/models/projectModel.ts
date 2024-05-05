export interface IProjectModel {
  id?: string;
  name: string;
  payment: number;
  time_start: string;
  time_end: string;
  note: string;
  priority: number;
  arrSelectedUser?: IDetailArraySelect[];
}

interface IDetailArraySelect {
  user_id: string;
  is_host: boolean;
}
