export interface IProjectModel {
  Id: number;
  Name: string;
  Payment: number;
  TimeStart: Date | null;
  TimeEnd: Date | null;
  Note: string;
  Priority: number;
}
