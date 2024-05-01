import { MenuItemCommandEvent } from "primereact/menuitem";
import { ITaskModel } from "./taskModel";
import { UniqueIdentifier } from "@dnd-kit/core";

export interface IMenuItem {
  label?: string;
  icon?: string;
  to?: string;
  preventExact?: boolean;
  class?: string;
  url?: string;
  target?: string;
  severity?: string | undefined;
  items?: IMenuItem | IMenuItem[];
  command?: (event?: React.MouseEvent | MenuItemCommandEvent) => void;
  template?: () => void;
}

export interface IModel {
  label: string;
  items?: IMenuItem[];
  separator?: boolean;
  disable?: boolean;
}
export interface IProjectProps {
  projectName: string;
}
export interface IColumnTaskBoardModel {
  id: string;
  title: string;
  status: number;
  taskItems: ITaskModel[];
}

export type ColumnType = "Column";

export interface IColumnDragData {
  type: ColumnType;
  column: IColumnTaskBoardModel;
}
