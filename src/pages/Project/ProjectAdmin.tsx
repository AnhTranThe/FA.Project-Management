/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import dayjs from "dayjs";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import { RadioButton } from "primereact/radiobutton";
import { Toolbar } from "primereact/toolbar";
import React, { useContext, useEffect, useState } from "react";
import {
  createProjectService,
  deleteProjectService,
  updateProjectService,
} from "../../Services/projectServiceApi";
import { getListUserService } from "../../Services/userServiceApi";
import { useAppSelector } from "../../hooks/ReduxHook";
import { IProjectModel } from "../../models/projectModel";
import { IUserListModel } from "../../models/userListModel";
import { getProjectAll } from "../../store/action/projectAction";
import { useAppDispatch } from "../../store/store";
import { validateProject } from "../../utils/yup";
import { IToastValueContext, ToastContext } from "../context/toastContext";

export default function ProjectAdmin() {
  const [isNewProject, setIsNewProject] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [colorSelect, setColoSelect] = useState("");
  const dispatch = useAppDispatch();
  const { data }: { data: IProjectModel[] } = useAppSelector(
    (state) => state.projectReducer
  );
  const [listUser, setListUser] = useState<IUserListModel[] | []>([]);
  const [ingredient, setIngredient] = useState("");
  const { setShowModelToast } = useContext<IToastValueContext>(ToastContext);
  const [idProject, setIDProject] = useState("");

  const [detailProject, setDetailProject] = useState<IProjectModel>({
    id: "",
    name: "",
    payment: 0,
    note: "",
    priority: 0,
    time_start: "",
    time_end: "",
  });

  const handleGetListUser = async () => {
    const res = await getListUserService();
    const filterRes = res.filter((user) => user.email !== "admin@gmail.com");
    setListUser(filterRes);
  };
  useEffect(() => {
    dispatch(getProjectAll());
    handleGetListUser();
  }, []);

  useEffect(() => {
    setValues({
      id: detailProject?.id,
      name: detailProject?.name,
      payment: +detailProject?.payment,
      note: detailProject?.note,
      priority: detailProject?.priority,
      time_start: detailProject?.time_start,
      time_end: detailProject?.time_end,
    });
  }, [detailProject]);

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    resetForm,
  } = useFormik({
    initialValues: {
      id: detailProject?.id,
      name: detailProject?.name,
      payment: +detailProject?.payment,
      note: detailProject?.note,
      priority: detailProject?.priority,
      time_start: detailProject?.time_start,
      time_end: detailProject?.time_end,
    },
    validationSchema: validateProject,
    onSubmit: (value) => {
      if (selectedUsers.length === 0 && isNewProject) {
        setShowModelToast({
          severity: "warn",
          summary: "Warning",
          detail: "pls!! add user in project",
        });
        return;
      }

      if (ingredient === "" && isNewProject) {
        setShowModelToast({
          severity: "warn",
          summary: "Warning",
          detail: "pls!! choose host for project",
        });
        return;
      }

      const changeArray = selectedUsers.map((ele: IProjectModel) => {
        if (ele.name === ingredient) {
          return { user_id: ele.id, is_host: true };
        } else {
          return { user_id: ele.id, is_host: false };
        }
      });

      let newData;
      if (isNewProject) {
        newData = {
          ...value,
          time_start: dayjs(value.time_start).format("YYYY-MM-DD"),
          time_end: dayjs(value.time_end).format("YYYY-MM-DD"),
          arrSelectedUser: changeArray,
        };
      } else {
        newData = {
          ...value,
          priority: +value.priority,
          time_start: dayjs(value.time_start).format("YYYY-MM-DD"),
          time_end: dayjs(value.time_end).format("YYYY-MM-DD"),
        };
      }
      isNewProject ? handleAddProject(newData) : handleUpdateProject(newData);
    },
  });

  useEffect(() => {
    switch (values.priority + "") {
      case "1":
        setColoSelect("#22C55E");
        break;
      case "2":
        setColoSelect("#f97316");
        break;
      case "3":
        setColoSelect("#EF4444");
        break;
      default:
        setColoSelect("white");
        break;
    }
  }, [values.priority]);

  const openDialogForCreate = () => {
    resetForm();
    setIngredient("");
    setSelectedUsers([]);
    setDialogVisible(true);
    setIsNewProject(true);
  };

  const handleAddProject = async (data: IProjectModel) => {
    const res = await createProjectService(data);
    if (res.code === 200) {
      setShowModelToast({
        severity: "success",
        summary: "Success",
        detail: "Create Project Success",
      });
      dispatch(getProjectAll());
      setDialogVisible(false);
    } else {
      setShowModelToast({
        severity: "warn",
        summary: "Warning",
        detail: `${res?.message || "Something Wrong"}`,
      });
    }
  };

  const openDialogForUpdate = (rowData) => {
    const newData = {
      id: rowData.id,
      name: rowData.name,
      payment: Math.round(+rowData.payment),
      note: rowData.note,
      priority: rowData.priority,
      time_start: dayjs(rowData.time_start).format("YYYY-MM-DD"),
      time_end: dayjs(rowData.time_end).format("YYYY-MM-DD"),
    };
    setDetailProject(newData);
    setDialogVisible(true);
    setIsNewProject(false);
  };

  const handleUpdateProject = async (data: IProjectModel) => {
    const res = await updateProjectService(data);
    if (res.code === 200) {
      setShowModelToast({
        severity: "success",
        summary: "Success",
        detail: "Update Project Success",
      });
      dispatch(getProjectAll());
      setDialogVisible(false);
    } else {
      setShowModelToast({
        severity: "warn",
        summary: "Warning",
        detail: `${res?.message || "Something Wrong"}`,
      });
    }
  };

  const handleDeleteProject = (project: IProjectModel) => {
    setIDProject(project.id);
    setDeleteDialogVisible(true); // Open the confirmation dialog
  };

  const confirmDelete = async () => {
    if (!idProject) {
      return;
    }
    const res = await deleteProjectService(idProject);
    if (res.code === 200) {
      setShowModelToast({
        severity: "success",
        summary: "Success",
        detail: "Update Project Success",
      });
      dispatch(getProjectAll());
      setDeleteDialogVisible(false);
    } else {
      setShowModelToast({
        severity: "warn",
        summary: "Warning",
        detail: `${res?.message || "Something Wrong"}`,
      });
    }
  };

  const bodyPaymentTemple = (rowData) => {
    return (
      <p key={rowData.id}>
        {Math.round(rowData.payment).toLocaleString("vi-VN")} vnđ
      </p>
    );
  };
  const bodyPriorityTemple = (rowData) => {
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
  const bodyleftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button
            label="New"
            onClick={openDialogForCreate}
            icon="pi pi-plus"
            severity="success"
            className=" mr-2"
          />
        </div>
      </React.Fragment>
    );
  };
  const bodyTimeStartTemplate = (rowData) => {
    return (
      <p key={rowData.id}>{dayjs(rowData.time_start).format("DD/MM/YYYY")}</p>
    );
  };
  const bodyTimeEndTemplate = (rowData) => {
    return (
      <p key={rowData.id}>{dayjs(rowData.time_end).format("DD/MM/YYYY")}</p>
    );
  };

  const handleChangeSelectPriority = (event) => {
    setValues((value) => {
      return {
        ...value,
        priority: +event.target.value,
      };
    });
  };
  return (
    <>
      <div className="grid crud-demo">
        <div className="col-12">
          <div className="card">
            <Toolbar className="mb-4" left={bodyleftToolbarTemplate}></Toolbar>
            <DataTable value={data}>
              <Column field="name" header="Name" />
              <Column
                field="payment"
                header="Payment"
                body={bodyPaymentTemple}
              />
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
              <Column
                field="time_end"
                header="Time End"
                body={bodyTimeEndTemplate}
              />

              <Column
                header="Actions"
                body={(rowData: IProjectModel) => (
                  <div className="flex-nowrap flex">
                    {/* Update Button */}
                    <Button
                      icon="pi pi-pencil"
                      label="Update"
                      className="p-button-rounded p-button-success p-mr-2 "
                      onClick={() => openDialogForUpdate(rowData)}
                    />
                    {/* Delete Button */}
                    <Button
                      icon="pi pi-trash"
                      label="Delete"
                      className="p-button-rounded p-button-danger"
                      style={{ marginLeft: ".5rem" }}
                      onClick={() => handleDeleteProject(rowData)}
                    />
                  </div>
                )}
              />
            </DataTable>
          </div>
        </div>
      </div>

      <Dialog
        header={isNewProject ? "Add Project" : "Update Project"}
        visible={dialogVisible}
        style={{ width: "600px" }}
        onHide={() => setDialogVisible(false)}>
        <form className="p-fluid" onSubmit={handleSubmit}>
          <div className="flex justify-content-center gap-5 mb-3">
            <div className="w-full">
              <label htmlFor="name">Project Name</label> <br />
              <input
                className="px-3 py-2 w-full mt-2"
                type="text"
                name="name"
                defaultValue={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="project name..."
              />
              {errors.name && touched.name && (
                <p className="text-red-500 mt-1">{errors.name}</p>
              )}
            </div>
            <div className="w-full">
              <label htmlFor="payment">Payment</label> <br />
              <input
                className="px-3 py-2 w-full mt-2"
                type="number"
                name="payment"
                defaultValue={values.payment}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="payment..."
              />
              {errors.payment && touched.payment && (
                <p className="text-red-500 mt-1">{errors.payment}</p>
              )}
            </div>
          </div>
          <div className="flex justify-content-center align-items-center gap-5 mb-3">
            <div className="w-full">
              <label htmlFor="note">Note</label> <br />
              <input
                className="px-3 py-2 w-full mt-2"
                type="text"
                name="note"
                defaultValue={values.note}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="note..."
              />
              {errors.note && touched.note && (
                <p className="text-red-500 mt-1">{errors.note}</p>
              )}
            </div>
            <div className="w-full">
              <label htmlFor="priority">Priority</label> <br />
              <select
                className="px-3 py-2 w-full mt-2"
                name="priority"
                id="priority"
                value={values.priority + "" || "0"}
                style={{ backgroundColor: `${colorSelect}`, color: "black" }}
                onChange={handleChangeSelectPriority}>
                <option value="0">pls Choose priority</option>
                <option value="1" className="p-button p-button-success">
                  LOW
                </option>
                <option value="2" className="p-button p-button-warning">
                  MEDIUM
                </option>
                <option value="3" className="p-button p-button-danger">
                  HIGH
                </option>
              </select>
              {errors.priority && touched.priority && (
                <p className="text-red-500 mt-1">{errors.priority}</p>
              )}
            </div>
          </div>
          <div className="flex justify-content-center gap-5 mb-3">
            <div className="w-full">
              <label htmlFor="time_start">Time Start</label> <br />
              <input
                className="px-3 py-2 w-full mt-2"
                type="date"
                name="time_start"
                value={values.time_start}
                onChange={handleChange}
              />
              {errors.time_start && touched.time_start && (
                <p className="text-red-500 mt-1">{errors.time_start}</p>
              )}
            </div>
            <div className="w-full">
              <label htmlFor="time_end">Time End</label> <br />
              <input
                className="px-3 py-2 w-full mt-2"
                type="date"
                name="time_end"
                value={values.time_end}
                onChange={handleChange}
              />
              {errors.time_end && touched.time_end && (
                <p className="text-red-500 mt-1">{errors.time_end}</p>
              )}
            </div>
          </div>
          {isNewProject ? (
            <>
              <div className="flex flex-column justify-content-center mb-3">
                <label htmlFor="arrSelectedUser" className="ml-1 mb-2">
                  Add User In Project
                </label>
                <MultiSelect
                  value={selectedUsers}
                  onChange={(e) => setSelectedUsers(e.value)}
                  options={listUser}
                  optionLabel="name"
                  placeholder="Select User In Project"
                  maxSelectedLabels={4}
                  className="w-full md:w-30rem"
                />
              </div>
              <div className="flex flex-column mb-3 mt-2">
                <label htmlFor="arrSelectedUser" className="ml-1 mb-2">
                  Choose Host For Project
                </label>
                <div className="flex flex-wrap gap-3 mt-2">
                  {selectedUsers.length === 0 ? (
                    <p className="pl-4">....</p>
                  ) : (
                    selectedUsers.map((ele) => {
                      return (
                        <div
                          className="flex align-items-center pl-2"
                          key={ele.id}>
                          <RadioButton
                            inputId={ele.id}
                            name="pizza"
                            value={ele.name}
                            onChange={(e) => setIngredient(e.value)}
                            checked={ingredient === ele.name}
                          />
                          <label htmlFor="ingredient1" className="ml-2">
                            {ele.name}
                          </label>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          <div className="flex text-right mt-4">
            <Button
              label="Cancel"
              type="button"
              className="p-button-text"
              onClick={() => setDialogVisible(false)}
            />
            <Button
              label={isNewProject ? "Create" : "Save"}
              severity="success"
              type="submit"
            />
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
              severity="success"
              onClick={confirmDelete}
              autoFocus
            />
          </div>
        }>
        <p>Are you sure you want to delete this project?</p>
      </Dialog>
    </>
  );
}
