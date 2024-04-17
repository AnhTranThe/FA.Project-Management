/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Fragment, useContext, useEffect, useState } from "react";
import { IUserListModel } from "../../models/userListModel";
import {
  createNewUserService,
  deleteUserService,
  getListUserService,
} from "../../serviceApi/userServiceApi";
import { useAppDispatch } from "../../store/store";
import { IToastValueContext, ToastContext } from "../context/toastContext";

export default function UserAdmin() {
  const [filters1, setFilters1] = useState(null);
  const [globalFilterValue1, setGlobalFilterValue1] = useState("");
  const [expandedRows, setExpandedRows] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const { setShowModelToast } = useContext<IToastValueContext>(ToastContext);
  const dispatch = useAppDispatch();

  const [detailUserUpdate, setDetailUserUpdate] = useState<IUserListModel>({
    name: "",
    email: "",
    role: 0,
    password: "",
  });

  const [listUser, setListUser] = useState<IUserListModel[]>([]);
  const [idDelete, setIdDelete] = useState<string>("");

  // eslint-disable-line react-hooks/exhaustive-deps

  const getDataUser = async () => {
    const data: IUserListModel[] = await getListUserService();
    setListUser(data);
  };

  useEffect(() => {
    getDataUser();
  }, []);

  const handleOpenCreate = () => {
    setDetailUserUpdate((pre) => {
      return {
        ...pre,
        name: "",
        email: "",
        role: 2,
        password: "",
        id: "",
      };
    });
    setDialogVisible(true);
    setIsCreate(true);
  };

  const handleCreateUser = async (event: HTMLFormElement) => {
    event?.preventDefault();
    let data = await createNewUserService(detailUserUpdate);
    if (data?.code === 200) {
      setShowModelToast({
        severity: "success",
        summary: "Success",
        detail: data?.message || "Create User Succes",
      });
      getDataUser();
      setDialogVisible(false);
      return;
    } else {
      setShowModelToast({
        severity: "warn",
        summary: "Warning",
        detail: data?.message || "Create User False",
      });
      return;
    }
  };

  const handleDelete = (rowData) => {
    setIdDelete(rowData.id);
    setDeleteDialogVisible(true);
  };

  const confirmDelete = async () => {
    if (idDelete) {
      let res = await deleteUserService(idDelete);
      if (res.code === 200) {
        setShowModelToast({
          severity: "success",
          summary: "Success",
          detail: "Detele User Success",
        });
        getDataUser();
        setDeleteDialogVisible(false);
        setIdDelete("");
        return;
      }
      setShowModelToast({
        severity: "warn",
        summary: "Warning",
        detail: res.message,
      });
    }
  };

  const handleUpdateUser = (event: HTMLFormElement) => {
    event?.preventDefault();
    setDialogVisible(false);
  };

  const handleUpdateDetailUser = (detail: IUserListModel) => {
    setDetailUserUpdate(detail);
    setDialogVisible(true);
    setIsCreate(false);
  };

  const handleChangeUpdate = (event) => {
    if (event.target.name === "role") {
      setDetailUserUpdate((pre) => {
        return {
          ...pre,
          [event.target.name]: +event.target.value,
        };
      });
    } else {
      setDetailUserUpdate((pre) => {
        return {
          ...pre,
          [event.target.name]: event.target.value,
        };
      });
    }
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <Fragment key={rowData.id}>
        <Button
          icon="pi pi-pencil"
          label="Update"
          className="p-button-rounded p-button-success p-mr-2 "
          onClick={() => handleUpdateDetailUser(rowData)}
        />

        <Button
          icon="pi pi-trash"
          label="Delete"
          className="p-button-rounded p-button-danger"
          style={{ marginLeft: ".5rem" }}
          onClick={() => handleDelete(rowData)}
        />
      </Fragment>
    );
  };

  const roleBodyTemplate = (rowData) => {
    return <p key={rowData.id}>{rowData.role === 1 ? "Admin" : "User"}</p>;
  };

  const content = (
    <>
      <h5>List User</h5>
      <div className="my-2">
        <Button
          label="New"
          onClick={handleOpenCreate}
          icon="pi pi-plus"
          severity="success"
          className=" mr-2"
        />
      </div>
      <DataTable
        value={listUser}
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        responsiveLayout="scroll"
        dataKey="id">
        <Column field="name" header="Name" sortable />
        <Column field="email" header="Email" sortable />
        <Column field="role" header="Role" body={roleBodyTemplate} />
        <Column field="Action" header="Action" body={actionBodyTemplate} />
      </DataTable>
    </>
  );

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">{content}</div>

        <Dialog
          header={isCreate ? "Add User" : "Update User"}
          visible={dialogVisible}
          style={{ width: "550px" }}
          onHide={() => setDialogVisible(false)}>
          <form
            className="p-fluid"
            onSubmit={isCreate ? handleCreateUser : handleUpdateUser}>
            <div className="p-field mb-4">
              <label>Name</label>
              <InputText
                name="name"
                value={detailUserUpdate.name}
                onChange={handleChangeUpdate}
                className="mt-2"
                placeholder="name..."
                required={true}
              />
            </div>
            <div className="p-field mb-4">
              <label>Email</label>
              <InputText
                name="email"
                type="email"
                value={detailUserUpdate.email}
                onChange={handleChangeUpdate}
                className="mt-2"
                placeholder="email..."
                required={true}
              />
            </div>
            <div className="p-field mb-4">
              <label>Password</label>
              <InputText
                name="password"
                type="text"
                value={detailUserUpdate.password}
                onChange={handleChangeUpdate}
                className="mt-2"
                placeholder="password..."
                required={true}
              />
            </div>
            <div className="p-field mb-4">
              <label className="mr-2">Role:</label>
              <select
                className="px-3 py-2"
                defaultValue={detailUserUpdate.role + ""}
                name="role"
                onChange={handleChangeUpdate}>
                <option value="1">Admin</option>
                <option value="2">User</option>
              </select>
            </div>
            <div className="p-field mb-4 flex justify-content-end">
              <div className="flex w-6">
                <Button
                  label="Cancel"
                  className="p-button-text underline"
                  onClick={() => setDialogVisible(false)}
                />
                <Button
                  label={isCreate ? "Create" : "Update"}
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
                label="No! thanks"
                onClick={() => setDeleteDialogVisible(false)}
                className="p-button-text underline"
              />
              <Button label="Yes" icon="pi pi-check" onClick={confirmDelete} />
            </div>
          }>
          <p>Are you sure you want to delete this User?</p>
        </Dialog>
      </div>
    </div>
  );
}
