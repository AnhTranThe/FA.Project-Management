import { IModel } from "../models/commonModel";

const utilitiesNavigations: IModel[] = [
  {
    label: "Service",
    items: [
      {
        label: "Project",
        icon: "pi pi-fw pi-prime",
        to: "/utilities/project",
      },
      {
        label: "Task",
        icon: "pi pi-fw pi-desktop",
        to: "/utilities/task",
      },
    ],
  },
];

export default utilitiesNavigations;
