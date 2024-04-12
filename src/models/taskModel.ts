export interface ITaskModel {
  Id: number | null;
  UserMail: string;
  ProjectId: number;
  TimeStart: Date | null;
  TimeEnd: Date | null;
  Status: number;
  Note: string;
}
