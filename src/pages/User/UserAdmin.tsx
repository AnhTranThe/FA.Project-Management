/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Fragment, ReactNode, useEffect, useState } from "react";
import { getListUserService } from "../../serviceApi/userServiceApi";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { IUserListModel, IUserReducer } from "../../models/userListModel";
import DetailUser from "./DetailUser";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { getListUserAction } from "../../store/action/userAction";
import { useAppSelector } from "../../hooks/ReduxHook";
import { ILoginReducer } from "../../models/loginModel";

export default function UserAdmin() {
  const [customers1, setCustomers1] = useState(null);
  const [customers2, setCustomers2] = useState([]);
  const [customers3, setCustomers3] = useState([]);
  const [filters1, setFilters1] = useState(null);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [idFrozen, setIdFrozen] = useState(false);
  const [products, setProducts] = useState([]);
  const [globalFilterValue1, setGlobalFilterValue1] = useState("");
  const [expandedRows, setExpandedRows] = useState(null);
  const [allExpanded, setAllExpanded] = useState(false);

  const dispatch = useAppDispatch();
  const { listUser } = useAppSelector(
    (state: IUserReducer) => state.userReducer
  );

  const { detailUser } = useAppSelector(
    (state: ILoginReducer) => state.loginReducer
  );

  const representatives = [
    { name: "Amy Elsner", image: "amyelsner.png" },
    { name: "Anna Fali", image: "annafali.png" },
    { name: "Asiya Javayant", image: "asiyajavayant.png" },
    { name: "Bernardo Dominic", image: "bernardodominic.png" },
    { name: "Elwin Sharvill", image: "elwinsharvill.png" },
    { name: "Ioni Bowcher", image: "ionibowcher.png" },
    { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
    { name: "Onyama Limba", image: "onyamalimba.png" },
    { name: "Stephen Shaw", image: "stephenshaw.png" },
    { name: "XuXue Feng", image: "xuxuefeng.png" },
  ];

  const statuses = [
    "unqualified",
    "qualified",
    "new",
    "negotiation",
    "renewal",
    "proposal",
  ];

  const clearFilter1 = () => {
    initFilters1();
  };

  const renderHeader1 = () => {
    return (
      <div className="flex justify-content-between">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          className="p-button-outlined"
          onClick={clearFilter1}
        />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue1}
            onChange={onGlobalFilterChange1}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };

  // eslint-disable-line react-hooks/exhaustive-deps

  const formatDate = (value) => {
    return value.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const initFilters1 = () => {
    setFilters1({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      "country.name": {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      representative: { value: null, matchMode: FilterMatchMode.IN },
      date: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
      balance: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      status: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
      verified: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    setGlobalFilterValue1("");
  };

  const countryBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <img
          alt="flag"
          src={`/demo/images/flag/flag_placeholder.png`}
          className={`flag flag-${rowData.country.code}`}
          width={30}
        />
        <span style={{ marginLeft: ".5em", verticalAlign: "middle" }}>
          {rowData.country.name}
        </span>
      </React.Fragment>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <Fragment key={rowData.name}>
        <Button
          icon="pi pi-user"
          className="p-button-rounded p-button-info p-button-text"
        />
        <Button
          icon="pi pi-times"
          className="p-button-rounded p-button-danger p-button-text"
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
  // if (detailUser.Role !== 1) {
  //   return <Navigate to={`/uikit/user/detail/${detailUser.Email}`} />;
  // }
  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">{content}</div>
      </div>
    </div>
  );
}
