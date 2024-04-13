import { IModel } from "../models/commonModel";

const homeNavigations: IModel[] = [
  {
    label: "Home",
    items: [
      { label: "Dashboard", icon: "pi pi-fw pi-home", to: "/" },
    ],
  },
];

export default homeNavigations;
