import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { IProjectModel } from "../../models/projectModel";
import { Button } from "primereact/button";
import dayjs from "dayjs";
import { useAppSelector } from "../../hooks/ReduxHook";

export default function ProjectUserDetailService() {
  const { data }: { data: IProjectModel[] } = useAppSelector(
    (state) => state.projectReducer
  );

  const bodyPaymentTemple = (rowData: IProjectModel) => {
    return (
      <p key={rowData.id}>
        {Math.round(rowData.payment).toLocaleString("vi-VN")} vnđ
      </p>
    );
  };
  const bodyPriorityTemple = (rowData: IProjectModel) => {
    let content;
    if (rowData.priority === 1) {
      content = (
        <Button
          className="text-xs cursor-auto"
          key={rowData.id}
          label="LOW"
          severity="success"
        />
      );
    } else if (rowData.priority === 2) {
      content = (
        <Button
          className="text-xs cursor-auto"
          key={rowData.id}
          label="MEDIUM"
          severity="warning"
        />
      );
    } else {
      content = (
        <Button
          className="text-xs cursor-auto"
          key={rowData.id}
          label="HIGH"
          severity="danger"
        />
      );
    }
    return content;
  };

  const bodyTimeStartTemplate = (rowData: IProjectModel) => {
    return (
      <p key={rowData.id}>{dayjs(rowData.time_start).format("DD/MM/YYYY")}</p>
    );
  };
  const bodyTimeEndTemplate = (rowData: IProjectModel) => {
    return (
      <p key={rowData.id}>{dayjs(rowData.time_end).format("DD/MM/YYYY")}</p>
    );
  };

  return (
    <DataTable value={data}>
      <Column field="name" header="Name" />
      <Column field="payment" header="Payment" body={bodyPaymentTemple} />
      <Column field="note" header="Note" />
      <Column
        headerStyle={{ justifyContent: "center" }}
        field="priority"
        header="Priority"
        body={bodyPriorityTemple}
        style={{ minWidth: "7rem", textAlign: "center" }}
      />
      <Column
        field="time_start"
        header="Time Start"
        body={bodyTimeStartTemplate}
      />
      <Column field="time_end" header="Time End" body={bodyTimeEndTemplate} />
    </DataTable>
  );
}
