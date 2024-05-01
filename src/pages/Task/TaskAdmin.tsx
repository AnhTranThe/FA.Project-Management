import dayjs from "dayjs";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Toolbar } from "primereact/toolbar";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { getListProjectService } from "../../Services/projectServiceApi";
import {
  createNewTaskService,
  deteleTaskService,
  getListTaskService,
  updateTaskService,
} from "../../Services/taskServiceApi";
import { getListUserService } from "../../Services/userServiceApi";
import { IProjectModel } from "../../models/projectModel";
import { ITaskModel } from "../../models/taskModel";
import { IUserListModel } from "../../models/userListModel";
import { IToastValueContext, ToastContext } from "../context/toastContext";
import { validateTask } from "../../utils/yup";

export default function TaskAdmin() {
  const [isNewTask, setIsNewTask] = useState(true);
  const [listTask, setListTask] = useState<ITaskModel[]>([]);
  const [listUser, setListUser] = useState<{ email: string }[]>([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [taskID, setTaskID] = useState("");
  const [listProject, setListProject] = useState<
    { id: string; name: string }[]
  >([]);
  const [detailTask, setDetailTask] = useState<ITaskModel>({
    id: "",
    user_mail: "",
    project_id: "",
    time_start: "",
    time_end: "",
    status: 0,
    note: "",
  });
  const { setShowModelToast } = useContext<IToastValueContext>(ToastContext);

  const handleGetListUser = async () => {
    const resUser = await getListUserService();
    const newListUser = resUser?.map((ele: IUserListModel) => {
      return {
        email: ele.email,
      };
    });
    setListUser(newListUser);
  };

  const handleGetListProject = async () => {
    const resProject = await getListProjectService();
    const newListProject = resProject?.map((ele: IProjectModel) => {
      return { id: ele.id, name: ele.name };
    });
    setListProject(newListProject);
  };

  const handleGetListTask = async () => {
    const res: ITaskModel[] = await getListTaskService();
    setListTask(res);
  };
  useEffect(() => {
    handleGetListTask();
    handleGetListUser();
    handleGetListProject();
  }, []);

  const { values, errors, touched, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        id: detailTask?.id,
        user_mail: detailTask?.user_mail,
        project_id: detailTask?.project_id,
        time_start: detailTask.time_start
          ? dayjs(detailTask.time_start).format("YYYY-MM-DD")
          : "",
        time_end: detailTask.time_start
          ? dayjs(detailTask.time_start).format("YYYY-MM-DD")
          : "",
        status: detailTask?.status,
        note: detailTask?.note,
      },
      validationSchema: validateTask,
      onSubmit: async (value) => {
        console.log(value);
        const newData = {
          ...value,
          status: +value.status,
        };

        if (isNewTask) {
          await handleCreateNewTask(newData);
          return;
        } else {
          await handleUpdateTask(newData);
          return;
        }
      },
    });

  const handleCreateNewTask = async (data: ITaskModel) => {
    const res = await createNewTaskService(data);
    if (res.code === 200) {
      setShowModelToast({
        severity: "success",
        summary: "Success",
        detail: "Create Task Success",
      });
      await handleGetListTask();
      setDialogVisible(false);
    } else {
      setShowModelToast({
        severity: "warn",
        summary: "Warning",
        detail: `${res?.message || "Something Wrong"}`,
      });
    }
  };
  const handleUpdateTask = async (data: ITaskModel) => {
    const res = await updateTaskService(data);
    if (res.code === 200) {
      setShowModelToast({
        severity: "success",
        summary: "Success",
        detail: "Update Task Success",
      });
      await handleGetListTask();
      setDialogVisible(false);
    } else {
      setShowModelToast({
        severity: "warn",
        summary: "Warning",
        detail: `${res?.message || "Something Wrong"}`,
      });
    }
  };

  const handleDeleteTask = (rowData: ITaskModel) => {
    setDeleteDialogVisible(true);
    console.log(rowData.id);
    if (rowData.id) {
      setTaskID(rowData.id);
    }
  };

  const handleconfirmDelete = async () => {
    if (taskID) {
      const res = await deteleTaskService(taskID);
      if (res.code === 200) {
        setShowModelToast({
          severity: "success",
          summary: "Success",
          detail: "Delete Task Success",
        });
        await handleGetListTask();
      } else {
        setShowModelToast({
          severity: "warn",
          summary: "Warning",
          detail: `${res?.message || "Something Wrong"}`,
        });
      }
      setDeleteDialogVisible(false);
    }
  };

  const handleOpenUpdateModel = (rowData: ITaskModel) => {
    const newData = {
      id: rowData.id,
      user_mail: rowData.user_mail,
      project_id: rowData.project_id,
      time_start: dayjs(rowData.time_start).format("YYYY/MM/DD"),
      time_end: dayjs(rowData.time_end).format("YYYY/MM/DD"),
      status: rowData.status,
      note: rowData.note,
    };
    setDetailTask(newData);
    setDialogVisible(true);
    setIsNewTask(false);
  };

  const handleChangeSelectTask = (event: ChangeEvent<HTMLSelectElement>) => {
    setDetailTask((pre) => {
      return {
        ...pre,
        [event.target.name]: event.target.value,
      };
    });

    setFieldValue(event.target.name, event.target.value);
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setDetailTask((pre) => {
      return {
        ...pre,
        [event.target.name]: event.target.value,
      };
    });
    setFieldValue(event.target.name, event.target.value);
  };

  const handleCancel = () => {
    setDetailTask({
      user_mail: "",
      project_id: "",
      time_start: "",
      time_end: "",
      status: 0,
      note: "",
    });
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

  const bodyActionTemplate = (rowData: ITaskModel) => {
    return (
      <div key={rowData.id} className="flex-nowrap flex">
        {/* Update Button */}
        <Button
          icon="pi pi-pencil"
          label="Update"
          className="p-button-rounded p-button-success p-mr-2 "
          onClick={() => handleOpenUpdateModel(rowData)}
        />
        {/* Delete Button */}
        <Button
          icon="pi pi-trash"
          label="Delete"
          className="p-button-rounded p-button-danger"
          style={{ marginLeft: ".5rem" }}
          onClick={() => handleDeleteTask(rowData)}
        />
      </div>
    );
  };

  const bodyleftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button
            label="New"
            onClick={() => {
              openDialogForCreate();
            }}
            icon="pi pi-plus"
            severity="success"
            className=" mr-2"
          />
        </div>
      </React.Fragment>
    );
  };

  const openDialogForCreate = () => {
    handleCancel();
    setDialogVisible(true);
    setIsNewTask(true);
  };

  return (
    <>
      <div className="grid crud-demo">
        <div className="col-12">
          <div className="card">
            <Toolbar className="mb-4" left={bodyleftToolbarTemplate}></Toolbar>
            <DataTable value={listTask}>
              <Column field="user_name" header="User Name"></Column>
              <Column field="user_mail" header="User Email"></Column>
              <Column field="project_name" header="Project Name"></Column>
              <Column field="status" header="Status"></Column>
              <Column field="note" header="Note"></Column>
              <Column
                field="time_start"
                header="Time Start"
                body={bodyTimeStartTemplate}></Column>
              <Column
                field="time_end"
                header="Time End"
                body={bodyTimeEndTemplate}></Column>

              <Column header="Actions" body={bodyActionTemplate} />
            </DataTable>
          </div>
        </div>
      </div>

      <Dialog
        header={isNewTask ? "Add Task" : "Update Task"}
        visible={dialogVisible}
        style={{ width: "550px" }}
        onHide={() => {
          setDialogVisible(false);
          handleCancel();
        }}>
        <form className="p-fluid" onSubmit={handleSubmit}>
          <div className="p-field  my-4">
            <label>User Email</label>
            <select
              className="w-full px-2 py-3 border-round"
              defaultValue={values.user_mail}
              name="user_mail"
              onChange={handleChangeSelectTask}>
              <option value="">pls choose email</option>
              {listUser?.map((ele: { email: string }) => {
                return (
                  <option value={ele.email} key={ele.email}>
                    {ele.email}
                  </option>
                );
              })}
            </select>
            {errors.user_mail && touched.user_mail && (
              <span className="text-red-500">{errors.user_mail}</span>
            )}
          </div>
          <div className="p-field  my-4">
            <label>Project Id</label>
            <select
              className="w-full px-2 py-3 border-round"
              defaultValue={values.project_id}
              name="project_id"
              onChange={handleChangeSelectTask}>
              <option value="">pls choose project</option>
              {listProject?.map((ele: { id: string; name: string }) => {
                return (
                  <option value={ele.id} key={ele.id}>
                    {ele.name}
                  </option>
                );
              })}
            </select>
            {errors.project_id && touched.project_id && (
              <span className="text-red-500">{errors.project_id}</span>
            )}
          </div>
          <div className="p-field  my-4">
            <label>Status</label>
            <br />
            <input
              defaultValue={values.status}
              className="px-3 py-2 w-full"
              type="number"
              name="status"
              required
              onChange={handleChangeInput}
              onBlur={handleBlur}
            />
            {errors.status && touched.status && (
              <span className="text-red-500">{errors.status}</span>
            )}
          </div>
          <div className="p-field  my-4">
            <label>Note</label>
            <br />
            <input
              defaultValue={values.note}
              className="px-3 py-2 w-full"
              type="text"
              name="note"
              required
              onChange={handleChangeInput}
              onBlur={handleBlur}
            />
            {errors.note && touched.note && (
              <span className="text-red-500">{errors.note}</span>
            )}
          </div>
          <div className="p-field my-4">
            <label>Time start</label>
            <br />
            <input
              value={values.time_start}
              className="px-3 py-2 w-full"
              type="date"
              name="time_start"
              required
              onChange={handleChangeInput}
            />
          </div>
          <div className="p-field my-4">
            <label>Time end</label>
            <br />
            <input
              value={values.time_end}
              className="px-3 py-2 w-full"
              type="date"
              name="time_end"
              required
              onChange={handleChangeInput}
            />
          </div>
          <div className="p-field mb-4 flex justify-content-end mt-5">
            <div className="flex">
              <Button
                type="button"
                label="Cancel"
                className="p-button-text underline"
                onClick={() => {
                  setDialogVisible(false);
                  handleCancel();
                }}
              />
              <Button
                label={isNewTask ? "Create" : "Update"}
                severity="success"
                type="submit"
              />
            </div>
          </div>
        </form>
      </Dialog>

      <Dialog
        header="Confirm Delete"
        visible={deleteDialogVisible}
        style={{ width: "30vw" }}
        onHide={() => setDeleteDialogVisible(false)}
        footer={
          <div className="text-right">
            <Button
              label="No"
              icon="pi pi-times"
              onClick={() => setDeleteDialogVisible(false)}
              className="p-button-text"
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              onClick={handleconfirmDelete}
              autoFocus
            />
          </div>
        }>
        <p>Are you sure you want to delete this task?</p>
      </Dialog>
    </>
  );
}
