import { IModel } from "../../models/commonModel";

export default function serviceClientNavigations(id: string): IModel[] {
  return [
    {
      label: "Service",
      items: [
        {
          label: "Board",
          icon: "pi pi-objects-column",
          to: `/Client/projects/${id}/Board`,
        },
      ],
    },
  ];
}
