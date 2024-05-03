import { ITaskModel } from "./taskModel";

export interface IColumnData {
  [id: string]: ITaskModel[];
}

export type Status = "to-do" | "in-progress" | "is-done";
export interface IColumnTaskBoardModel {
  id: string;
  title: string;
  status: number;
  taskItems: ITaskModel[];
}
