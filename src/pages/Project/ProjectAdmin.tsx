/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../hooks/ReduxHook";
import { IProjectModel } from "../../models/projectModel";
import { getProjectAll } from "../../store/action/projectAction";
import { useAppDispatch } from "../../store/store";
import dayjs from "dayjs";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { useFormik } from "formik";
import { MultiSelect } from "primereact/multiselect";
import { IUserListModel } from "../../models/userListModel";
import { getListUserService } from "../../Services/userServiceApi";
import { RadioButton } from "primereact/radiobutton";
import { validateProject } from "../../utils/yup";

export default function ProjectAdmin() {
  const [isNewProject, setIsNewProject] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const dispatch = useAppDispatch();
  const toast = useRef<Toast>(null);
  const { data }: { data: IProjectModel[] } = useAppSelector(
    (state) => state.projectReducer
  );
  const [listUser, setListUser] = useState<IUserListModel[] | []>([]);
  const [ingredient, setIngredient] = useState("");

  const emptyProject: IProjectModel = {
    name: "",
    payment: 0,
    note: "",
    priority: 1,
    time_start: "",
    time_end: "",
  };
  const [detailProject, setDetailProject] =
    useState<IProjectModel>(emptyProject);

  const handleGetListUser = async () => {
    const res = await getListUserService();
    setListUser(res);
  };
  useEffect(() => {
    dispatch(getProjectAll());
    handleGetListUser();
  }, []);

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: detailProject,
      validationSchema: validateProject,
      onSubmit: (value) => {
        console.log(value);
      },
    });

  const openDialogForUpdate = (rowData) => {
    setDialogVisible(true);
    setIsNewProject(false);
  };

  const handleAddProject = () => {
    setDialogVisible(false);
  };

  const openDialogForCreate = (rowData) => {
    setDialogVisible(true);
    setIsNewProject(true);
  };

  const handleUpdateProject = () => {
    setDialogVisible(false);
  };

  const handleDeleteProject = (task: IProjectModel) => {
    setDeleteDialogVisible(true); // Open the confirmation dialog
  };

  const confirmDelete = () => {
    // if (ProjectToDelete) {
    //   try {
    //     // dispatch(deleteProject(ProjectToDelete?.Id ?? 0));
    //     toast.current?.show({
    //       severity: "success",
    //       summary: "Successful",
    //       detail: "task deleted permanently",
    //       life: 2000,
    //     });
    //   } catch (error) {
    //     toast.current?.show({
    //       severity: "error",
    //       summary: "Error",
    //       detail: "Failed to delete task",
    //       life: 2000,
    //     });
    //   }
    //   setDeleteDialogVisible(false);
    // }
    setDeleteDialogVisible(false);
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
                id="name"
                name="name"
                onChange={handleChange}
                placeholder="project name..."
              />
              {errors.name && touched.name && (
                <p className="text-red-500 mt-1">{errors.name}</p>
              )}
            </div>
            <div className="w-full">
              <label htmlFor="name">Payment</label> <br />
              <input
                className="px-3 py-2 w-full mt-2"
                type="number"
                id="payment"
                name="payment"
                onChange={handleChange}
                placeholder="payment..."
              />
              {errors.payment && touched.payment && (
                <p className="text-red-500 mt-1">{errors.payment}</p>
              )}
            </div>
          </div>
          <div className="flex justify-content-center gap-5 mb-3">
            <div className="w-full">
              <label htmlFor="note">Note</label> <br />
              <input
                className="px-3 py-2 w-full mt-2"
                type="text"
                id="note"
                name="note"
                onChange={handleChange}
                placeholder="note..."
              />
              {errors.note && touched.note && (
                <p className="text-red-500 mt-1">{errors.note}</p>
              )}
            </div>
            <div className="w-full">
              <label htmlFor="note">Priority</label> <br />
              <input
                className="px-3 py-2 w-full mt-2"
                type="number"
                id="priority"
                name="priority"
                onChange={handleChange}
                placeholder="priority..."
              />
              {errors.priority && touched.priority && (
                <p className="text-red-500 mt-1">{errors.priority}</p>
              )}
            </div>
          </div>
          <div className="flex justify-content-center gap-5 mb-3">
            <div className="w-full">
              <label htmlFor="note">Note</label> <br />
              <input
                className="px-3 py-2 w-full mt-2"
                type="date"
                name="time_start"
                onChange={handleChange}
              />
              {errors.time_start && touched.time_start && (
                <p className="text-red-500 mt-1">{errors.time_start}</p>
              )}
            </div>
            <div className="w-full">
              <label htmlFor="note">Priority</label> <br />
              <input
                className="px-3 py-2 w-full mt-2"
                type="date"
                name="time_end"
                onChange={handleChange}
              />
              {errors.time_end && touched.time_end && (
                <p className="text-red-500 mt-1">{errors.time_end}</p>
              )}
            </div>
          </div>
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
                <p>No User In Project</p>
              ) : (
                selectedUsers.map((ele) => {
                  return (
                    <div className="flex align-items-center" key={ele.id}>
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
          <div className="flex text-right mt-4">
            <Button
              label="Cancel"
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
