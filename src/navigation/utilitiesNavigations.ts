import { IModel } from "../models/commonModel";

const utilitiesNavigations: IModel[] = [
  {
    label: "Utilities",
    items: [
      {
        label: "PrimeIcons",
        icon: "pi pi-fw pi-prime",
        to: "/utilities/icons",
      },
      {
        label: "PrimeFlex",
        icon: "pi pi-fw pi-desktop",
        url: "https://www.primefaces.org/primeflex/",
        target: "_blank",
      },
    ],
  },
];

export default utilitiesNavigations;
