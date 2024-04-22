import { IModel } from "../../models/commonModel";

const serviceDashboardNavigations: IModel[] = [
  {
    label: "Service",
    items: [
      {
        label: "User",
        icon: "pi pi-fw pi-id-card",
        to: "/admin/user",
      },
      {
        label: "Project",
        icon: "pi pi-fw pi-prime",
        to: "/admin/project",
      },
      {
        label: "Task",
        icon: "pi pi-fw pi-desktop",
        to: "/admin/task",
      },
    ],
  },
];

export default serviceDashboardNavigations;
