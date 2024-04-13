/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Fragment, useContext, useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/ReduxHook";
import { ILoginReducer } from "../../models/loginModel";
import { IUserListModel, IUserReducer } from "../../models/userListModel";
import { getListUserService } from "../../serviceApi/userServiceApi";
import { getListUserAction } from "../../store/action/userAction";
import { useAppDispatch } from "../../store/store";
import { InputText } from "primereact/inputtext";
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
    Name: "",
    Email: "",
    Role: 0,
  });

  const { listUser } = useAppSelector(
    (state: IUserReducer) => state.userReducer
  );

  const { detailUser } = useAppSelector(
    (state: ILoginReducer) => state.loginReducer
  );

  // eslint-disable-line react-hooks/exhaustive-deps
  const handleUpdateDataBase = async () => {
    const data = await getListUserService();
    dispatch(getListUserAction(data));
  };

  const handleDelete = () => {
    setDeleteDialogVisible(true);
  };

  const confirmDelete = () => {
    setDeleteDialogVisible(false);
  };

  const handleCreateUser = (event: HTMLFormElement) => {
    event?.preventDefault();
    console.log(detailUserUpdate);
    setDialogVisible(false);
  };

  const handleUpdateUser = (event: HTMLFormElement) => {
    event?.preventDefault();
    console.log(detailUserUpdate);
    setDialogVisible(false);
  };

  const handleOpenCreate = () => {
    setDetailUserUpdate((pre) => {
      return {
        ...pre,
        Name: "",
        Email: "",
        Role: 2,
      };
    });
    setDialogVisible(true);
    setIsCreate(true);
  };

  const handleUpdateDetailUser = (detail: IUserListModel) => {
    console.log(detail);
    setDetailUserUpdate(detail);
    setDialogVisible(true);
    setIsCreate(false);
  };

  const handleChangeUpdate = (event) => {
    if (event.target.name === "Role") {
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
      <Fragment key={rowData.name}>
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
    return <p key={rowData.name}>{rowData.Role === 1 ? "Admin" : "User"}</p>;
  };

  useEffect(() => {
    (async () => {
      const data: IUserListModel[] = await getListUserService();
      dispatch(getListUserAction(data));
    })();
  }, []);

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
        dataKey="Name">
        <Column field="Name" header="Name" sortable />
        <Column field="Email" header="Email" sortable />
        <Column field="Role" header="Role" body={roleBodyTemplate} />
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
                name="Name"
                value={detailUserUpdate.Name}
                onChange={handleChangeUpdate}
                className="mt-2"
                placeholder="name..."
                required={true}
              />
            </div>
            <div className="p-field mb-4">
              <label>Email</label>
              <InputText
                name="Email"
                type="email"
                value={detailUserUpdate.Email}
                onChange={handleChangeUpdate}
                className="mt-2"
                placeholder="email..."
                required={true}
              />
            </div>
            <div className="p-field mb-4">
              <label className="mr-2">Role:</label>
              <select
                className="px-3 py-2"
                defaultValue={detailUserUpdate.Role + ""}
                name="Role"
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
