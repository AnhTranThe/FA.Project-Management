import { MenuItemCommandEvent } from "primereact/menuitem";

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
