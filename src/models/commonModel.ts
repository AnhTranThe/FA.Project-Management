export interface IMenuItem {
  label: string;
  icon: string;
  to?: string;
  preventExact?: boolean;
  class?: string;
  url?: string;
  target?: string;
  items?: IMenuItem[] | IMenuItem[][];
}

export interface IModel {
  label: string;
  items?: IMenuItem[];
  separator?: boolean;
}
