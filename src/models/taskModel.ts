export interface ITaskModel {
  id?: string | null;
  project_id: string | "";
  user_mail: string | "";
  user_name?: string | "";
  time_start: string | "";
  time_end: string | "";
  status: number;
  note: string | "";
}
