import { IModel } from "../../models/commonModel";

const pagesDashboardNavigations: IModel[] = [
  {
    label: "Pages",
    items: [
      {
        label: "Auth",
        icon: "pi pi-fw pi-user",
        items: [
          {
            label: "Login",
            icon: "pi pi-fw pi-sign-in",
            to: "/auth/login",
          },
          {
            label: "Error",
            icon: "pi pi-fw pi-times-circle",
            to: "/error/internal-error",
          },
          {
            label: "Access Denied",
            icon: "pi pi-fw pi-lock",
            to: "/error/not-auth",
          },
        ],
      },
      {
        label: "Crud",
        icon: "pi pi-fw pi-pencil",
        to: "/pages/crud",
      },
      {
        label: "Timeline",
        icon: "pi pi-fw pi-calendar",
        to: "/pages/timeline",
      },
      {
        label: "Not Found",
        icon: "pi pi-fw pi-exclamation-circle",
        to: "/pages/notfound",
      },
      {
        label: "Empty",
        icon: "pi pi-fw pi-circle-off",
        to: "/pages/empty",
      },
    ],
  },
];

export default pagesDashboardNavigations;
