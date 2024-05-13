import dayjs from "dayjs";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useAppSelector } from "../../hooks/ReduxHook";
import { ITaskModel } from "../../models/taskModel";

export default function TaskUserDetailService() {
  const { listTaskService }: { listTaskService: ITaskModel[] } = useAppSelector(
    (state) => state.taskReducer
  );

  const bodyIdTaskTemplate = (rowData: ITaskModel) => {
    return <p>{rowData.id.substring(0, 8)}</p>;
  };

  const bodyTimeStartTemplate = (rowData: ITaskModel) => {
    return (
      <p key={rowData.id}>{dayjs(rowData.time_start).format("DD/MM/YYYY")}</p>
    );
  };
  const bodyTimeEndTemplate = (rowData: ITaskModel) => {
    return (
      <p key={rowData.id}>{dayjs(rowData.time_end).format("DD/MM/YYYY")}</p>
    );
  };
  const bodyStatusTemplate = (rowData: ITaskModel) => {
    let content;
    if (rowData.status === 1) {
      content = (
        <Button
          className="text-xs cursor-auto"
          key={rowData.id}
          label="To-do"
          severity="success"
        />
      );
    } else if (rowData.status === 2) {
      content = (
        <Button
          className="text-xs cursor-auto"
          key={rowData.id}
          label="In-Progress"
          severity="warning"
        />
      );
    } else {
      content = (
        <Button
          className="text-xs cursor-auto"
          key={rowData.id}
          label="Done"
          severity="danger"
        />
      );
    }
    return content;
  };

  return (
    <DataTable value={listTaskService}>
      <Column field="id" header="ID Task" body={bodyIdTaskTemplate} />
      <Column field="user_mail" header="User Email" />
      <Column
        field="project_name"
        header="Project Name"
        style={{ minWidth: "10rem", textAlign: "center" }}
      />
      <Column
        headerStyle={{ justifyContent: "center" }}
        field="status"
        header="Status"
        body={bodyStatusTemplate}
        style={{ minWidth: "10rem", textAlign: "center" }}
      />
      <Column field="note" header="Note" />
      <Column
        field="time_start"
        header="Time Start"
        body={bodyTimeStartTemplate}
      />
      <Column field="time_end" header="Time End" body={bodyTimeEndTemplate} />
    </DataTable>
  );
}
