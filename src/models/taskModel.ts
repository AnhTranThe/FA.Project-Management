export interface ITaskModel {
  id: string | "";
  project_id: string | "";
  project_name?: string;
  user_mail: string | "";
  user_name?: string | "";
  time_start: string | "";
  time_end: string | "";
  status: number;
  note: string | "";
}
