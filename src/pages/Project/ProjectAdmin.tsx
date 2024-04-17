/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { ProgressBar } from "primereact/progressbar";
import { Slider } from "primereact/slider";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { classNames } from "primereact/utils";
import { Fragment, useEffect, useState, useRef } from "react";
import { CustomerService } from "../../demo/service/CustomerService";
import { ProductService } from "../../demo/service/ProductService";
import { Toolbar } from "primereact/toolbar";
import { useAppDispatch } from "../../store/store";
import { useAppSelector } from "../../hooks/ReduxHook";
import { getProjectAll } from "../../store/action/projectAction";
import { Dialog } from "primereact/dialog";
import { IProjectModel } from "../../models/projectModel";
import { Toast } from "primereact/toast";

export default function ProjectAdmin() {
  const dispatch = useAppDispatch();
  const emptyProject: IProjectModel = {
    Id: null,
    Name: "",
    Payment: 0,
    Note: "",
    TimeStart: null,
    TimeEnd: null,
  };
  const [project, setProject] = useState<IProjectModel>(emptyProject);
  const [ProjectToDelete, setPrjectToDelete] = useState<IProjectModel | null>(
    null
  );
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const toast = useRef<Toast>(null);
  const { data }: { data: IProjectModel[] } = useAppSelector(
    (state) => state.projectReducer
  );
  useEffect(() => {
    dispatch(getProjectAll());
  }, []);

  const handleDeleteProject = (task: IProjectModel) => {
    setPrjectToDelete(task);
    setDeleteDialogVisible(true); // Open the confirmation dialog
  };

  const confirmDelete = () => {
    if (ProjectToDelete) {
      try {
        dispatch(deleteProject(ProjectToDelete?.Id ?? 0));
        toast.current?.show({
          severity: "success",
          summary: "Successful",
          detail: "task deleted permanently",
          life: 2000,
        });
      } catch (error) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to delete task",
          life: 2000,
        });
      }
      setDeleteDialogVisible(false);
    }
  };
  return (
    <>
      <div className="grid crud-demo">
        <div className="col-12">
          <div className="card">
            {/* <Toast ref={toast} /> */}
            {/* <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar> */}
            <DataTable value={data}>
              <Column field="Id" header="ID"></Column>
              <Column field="Name" header="Project Name"></Column>
              <Column field="Payment" header="Project Payment"></Column>
              <Column field="Note" header="Project Note"></Column>
              <Column field="TimeStart" header="Time Start"></Column>
              <Column field="TimeEnd" header="Time End"></Column>

              <Column
                header="Actions"
                body={(rowData: IProjectModel) => (
                  <div className="flex-nowrap flex">
                    {/* Update Button */}
                    <Button
                      icon="pi pi-pencil"
                      label="Update"
                      className="p-button-rounded p-button-success p-mr-2 "
                      // onClick={() => openDialogForUpdate(rowData)}
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

      {/* <Dialog
        header={isNewTask ? "Add Task" : "Update Task"}
        visible={dialogVisible}
        style={{ width: "450px" }}
        onHide={() => setDialogVisible(false)}
      >
        <div className="p-fluid">
          <div className="p-field ">
            <label>Task Name</label>
            <InputText
              value={task.UserMail}
              onChange={(e) => setTask({ ...task, UserMail: e.target.value })}
            />
          </div>
          <div className="p-field ">
            <label>Project Id</label>
            <InputNumber
              value={task.ProjectId}
              onChange={(e) => setTask({ ...task, ProjectId: e.value ?? 0 })}
            />
          </div>
          <div className="p-field ">
            <label>Status</label>
            <InputNumber
              value={task.Status}
              onChange={(e) => setTask({ ...task, Status: e.value ?? 0 })}
            />
          </div>
          <div className="p-field ">
            <label>Note</label>
            <InputText
              value={task.Note}
              onChange={(e) => setTask({ ...task, Note: e.target.value })}
            />
          </div>
          <div className="p-field">
            <label>Time start</label>
            <Calendar
              value={task.TimeStart} // Assuming task.date is your date value
              onChange={(e) => setTask({ ...task, TimeStart: e.value || null })}
            />
          </div>
          <div className="p-field">
            <label>Time end</label>
            <Calendar
              value={task.TimeEnd} // Assuming task.date is your date value
              onChange={(e) => setTask({ ...task, TimeEnd: e.value || null })}
            />
          </div>
        </div>
        <div className="p-d-flex text-right mt-4">
          <Button
            label="Save"
            className="p-button-text"
            onClick={handleAddOrUpdateTask}
          />
          <Button
            label="Cancel"
            className="p-button-text"
            onClick={() => setDialogVisible(false)}
          />
        </div>
      </Dialog> */}

      <Dialog
        header="Confirm Delete"
        visible={deleteDialogVisible}
        style={{ width: "30vw" }}
        onHide={() => setDeleteDialogVisible(false)}
        footer={
          <div className="text-right">
            <Button
              label="Yes"
              icon="pi pi-check"
              onClick={confirmDelete}
              autoFocus
            />
            <Button
              label="No"
              icon="pi pi-times"
              onClick={() => setDeleteDialogVisible(false)}
              className="p-button-text"
            />
          </div>
        }
      >
        <p>Are you sure you want to delete this project?</p>
      </Dialog>
    </>
  );
}
// const toast = useRef<Toast>(null);
// const ProjectAdmin = () => {
//   const dispatch = useAppDispatch();
//   const { data }: { data: IProjectModel[] } = useAppSelector(
//     (state) => state.projectReducer
//   );

//   useEffect(() => {
//     dispatch(getProjectAll());
//   }, []);

//   const handleAddOrUpdateProject = () => {
//     const projectData: IProjectModel = {};
//   };
// const [customers1, setCustomers1] = useState(null);
// const [customers2, setCustomers2] = useState([]);
// const [customers3, setCustomers3] = useState([]);
// const [filters1, setFilters1] = useState(null);
// const [loading1, setLoading1] = useState(false);
// const [loading2, setLoading2] = useState(false);
// const [idFrozen, setIdFrozen] = useState(false);

// const [globalFilterValue1, setGlobalFilterValue1] = useState("");
// const [expandedRows, setExpandedRows] = useState(null);
// const [allExpanded, setAllExpanded] = useState(false);

// const representatives = [
//   { name: "Amy Elsner", image: "amyelsner.png" },
//   { name: "Anna Fali", image: "annafali.png" },
//   { name: "Asiya Javayant", image: "asiyajavayant.png" },
//   { name: "Bernardo Dominic", image: "bernardodominic.png" },
//   { name: "Elwin Sharvill", image: "elwinsharvill.png" },
//   { name: "Ioni Bowcher", image: "ionibowcher.png" },
//   { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
//   { name: "Onyama Limba", image: "onyamalimba.png" },
//   { name: "Stephen Shaw", image: "stephenshaw.png" },
//   { name: "XuXue Feng", image: "xuxuefeng.png" },
// ];

// const statuses = [
//   "unqualified",
//   "qualified",
//   "new",
//   "negotiation",
//   "renewal",
//   "proposal",
// ];

// const customerService = new CustomerService();
// const productService = new ProductService();

// const clearFilter1 = () => {
//   initFilters1();
// };

// const onGlobalFilterChange1 = (e) => {
//   const value = e.target.value;
//   const _filters1 = { ...filters1 };
//   _filters1["global"].value = value;

//   setFilters1(_filters1);
//   setGlobalFilterValue1(value);
// };

// const renderHeader1 = () => {
//   return (
//     <div className="flex justify-content-between">
//       {/* <Button
//           type="button"
//           icon="pi pi-filter-slash"
//           label="Clear"
//           className="p-button-outlined"
//           onClick={clearFilter1}
//         /> */}
//       {/* <span className="p-input-icon-left">
//           <i className="pi pi-search" />
//           <InputText
//             value={globalFilterValue1}
//             onChange={onGlobalFilterChange1}
//             placeholder="Keyword Search"
//           />
//         </span> */}
//     </div>
//   );
// };

// useEffect(() => {
//   setLoading2(true);

//   initFilters1();
// }, []); // eslint-disable-line react-hooks/exhaustive-deps

// const balanceTemplate = (rowData) => {
//   return (
//     <div>
//       <span className="text-bold">{formatCurrency(rowData.balance)}</span>
//     </div>
//   );
// };

// const getCustomers = (data) => {
//   return [...(data || [])].map((d) => {
//     d.date = new Date(d.date);
//     return d;
//   });
// };

// const formatDate = (value) => {
//   return value.toLocaleDateString("en-US", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//   });
// };

// const formatCurrency = (value) => {
//   return value.toLocaleString("en-US", {
//     style: "currency",
//     currency: "USD",
//   });
// };

// const initFilters1 = () => {
//   setFilters1({
//     global: { value: null, matchMode: FilterMatchMode.CONTAINS },
//     name: {
//       operator: FilterOperator.AND,
//       constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
//     },
//     "country.name": {
//       operator: FilterOperator.AND,
//       constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
//     },
//     representative: { value: null, matchMode: FilterMatchMode.IN },
//     date: {
//       operator: FilterOperator.AND,
//       constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
//     },
//     balance: {
//       operator: FilterOperator.AND,
//       constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
//     },
//     status: {
//       operator: FilterOperator.OR,
//       constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
//     },
//     activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
//     verified: { value: null, matchMode: FilterMatchMode.EQUALS },
//   });
//   setGlobalFilterValue1("");
// };

// const countryBodyTemplate = (rowData) => {
//   return (
//     <>
//       <img
//         alt="flag"
//         src={`/demo/images/flag/flag_placeholder.png`}
//         className={`flag flag-${rowData.country.code}`}
//         width={30}
//       />
//       <span style={{ marginLeft: ".5em", verticalAlign: "middle" }}>
//         {rowData.country.name}
//       </span>
//     </>
//   );
// };

// const filterClearTemplate = (options) => {
//   return (
//     <Button
//       type="button"
//       icon="pi pi-times"
//       onClick={options.filterClearCallback}
//       className="p-button-secondary"
//     ></Button>
//   );
// };

// const filterApplyTemplate = (options) => {
//   return (
//     <Button
//       type="button"
//       icon="pi pi-check"
//       onClick={options.filterApplyCallback}
//       className="p-button-success"
//     ></Button>
//   );
// };

// const representativeBodyTemplate = (rowData) => {
//   const representative = rowData.representative;
//   return (
//     <>
//       <img
//         alt={representative.name}
//         src={`/demo/images/avatar/${representative.image}`}
//         onError={(e) =>
//           (e.target.src =
//             "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
//         }
//         width={32}
//         style={{ verticalAlign: "middle" }}
//       />
//       <span style={{ marginLeft: ".5em", verticalAlign: "middle" }}>
//         {representative.name}
//       </span>
//     </>
//   );
// };

// const representativeFilterTemplate = (options) => {
//   return (
//     <>
//       <div className="mb-3 text-bold">Agent Picker</div>
//       <MultiSelect
//         value={options.value}
//         options={representatives}
//         itemTemplate={representativesItemTemplate}
//         onChange={(e) => options.filterCallback(e.value)}
//         optionLabel="name"
//         placeholder="Any"
//         className="p-column-filter"
//       />
//     </>
//   );
// };

// const representativesItemTemplate = (option) => {
//   return (
//     <div className="p-multiselect-representative-option">
//       <img
//         alt={option.name}
//         src={`/demo/images/avatar/${option.image}`}
//         width={32}
//         style={{ verticalAlign: "middle" }}
//       />
//       <span style={{ marginLeft: ".5em", verticalAlign: "middle" }}>
//         {option.name}
//       </span>
//     </div>
//   );
// };

// const dateBodyTemplate = (rowData) => {
//   return formatDate(rowData.date);
// };

// const dateFilterTemplate = (options) => {
//   return (
//     <Calendar
//       value={options.value}
//       onChange={(e) => options.filterCallback(e.value, options.index)}
//       dateFormat="mm/dd/yy"
//       placeholder="mm/dd/yyyy"
//       mask="99/99/9999"
//     />
//   );
// };

// const balanceBodyTemplate = (rowData) => {
//   return formatCurrency(rowData.balance);
// };

// const balanceFilterTemplate = (options) => {
//   return (
//     <InputNumber
//       value={options.value}
//       onChange={(e) => options.filterCallback(e.value, options.index)}
//       mode="currency"
//       currency="USD"
//       locale="en-US"
//     />
//   );
// };

// const statusBodyTemplate = (rowData) => {
//   return (
//     <span className={`customer-badge status-${rowData.status}`}>
//       {rowData.status}
//     </span>
//   );
// };

// const statusFilterTemplate = (options) => {
//   return (
//     <Dropdown
//       value={options.value}
//       options={statuses}
//       onChange={(e) => options.filterCallback(e.value, options.index)}
//       itemTemplate={statusItemTemplate}
//       placeholder="Select a Status"
//       className="p-column-filter"
//       showClear
//     />
//   );
// };

// const statusItemTemplate = (option) => {
//   return <span className={`customer-badge status-${option}`}>{option}</span>;
// };

// const activityBodyTemplate = (rowData) => {
//   return (
//     <ProgressBar
//       value={rowData.activity}
//       showValue={false}
//       style={{ height: ".5rem" }}
//     ></ProgressBar>
//   );
// };

// const activityFilterTemplate = (options) => {
//   return (
//     <>
//       <Slider
//         value={options.value}
//         onChange={(e) => options.filterCallback(e.value)}
//         range
//         className="m-3"
//       ></Slider>
//       <div className="flex align-items-center justify-content-between px-2">
//         <span>{options.value ? options.value[0] : 0}</span>
//         <span>{options.value ? options.value[1] : 100}</span>
//       </div>
//     </>
//   );
// };

// const verifiedBodyTemplate = (rowData) => {
//   return (
//     <i
//       className={classNames("pi", {
//         "text-green-500 pi-check-circle": rowData.verified,
//         "text-pink-500 pi-times-circle": !rowData.verified,
//       })}
//     ></i>
//   );
// };

// const verifiedFilterTemplate = (options) => {
//   return (
//     <TriStateCheckbox
//       value={options.value}
//       onChange={(e) => options.filterCallback(e.value)}
//     />
//   );
// };

// const toggleAll = () => {
//   if (allExpanded) collapseAll();
//   else expandAll();
// };

// const expandAll = () => {
//   const _expandedRows = {};
//   products.forEach((p) => (_expandedRows[`${p.id}`] = true));

//   setExpandedRows(_expandedRows);
//   setAllExpanded(true);
// };

// const collapseAll = () => {
//   setExpandedRows(null);
//   setAllExpanded(false);
// };

// const amountBodyTemplate = (rowData) => {
//   return formatCurrency(rowData.amount);
// };

// const statusOrderBodyTemplate = (rowData) => {
//   return (
//     <span className={`order-badge order-${rowData.status.toLowerCase()}`}>
//       {rowData.status}
//     </span>
//   );
// };

// const searchBodyTemplate = () => {
//   return <Button icon="pi pi-search" />;
// };

// const imageBodyTemplate = (rowData) => {
//   return (
//     <img
//       src={`/demo/images/product/${rowData.image}`}
//       onError={(e) =>
//         (e.target.src =
//           "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
//       }
//       alt={rowData.image}
//       className="shadow-2"
//       width={100}
//     />
//   );
// };

// const priceBodyTemplate = (rowData) => {
//   return formatCurrency(rowData.price);
// };
// const actionBodyTemplate = (rowData) => {
//   return (
//     <Fragment key={rowData.name}>
//       <Button
//         icon="pi pi-user"
//         className="p-button-rounded p-button-info p-button-text"
//       />
//       <Button
//         icon="pi pi-times"
//         className="p-button-rounded p-button-danger p-button-text"
//       />
//     </Fragment>
//   );
// };

// const roleBodyTemplate = (rowData) => {
//   return <p key={rowData.name}>{rowData.Role === 1 ? "Admin" : "User"}</p>;
// };

// useEffect(() => {
//   (async () => {
//     const data = await getListUserService();
//     setProducts(data);
//   })();
// }, []);
// const ratingBodyTemplate = (rowData) => {
//   return <Rating value={rowData.rating} readOnly cancel={false} />;
// };

// const statusBodyTemplate2 = (rowData) => {
//   return (
//     <span
//       className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>
//       {rowData.inventoryStatus}
//     </span>
//   );
// };

// const rowExpansionTemplate = (data) => {
//   return (
//     <div className="orders-subtable">
//       <h5>Orders for {data.name}</h5>
//       <DataTable value={data.orders} responsiveLayout="scroll">
//         <Column field="id" header="Id" sortable></Column>
//         <Column field="customer" header="Customer" sortable></Column>
//         <Column field="date" header="Date" sortable></Column>
//         <Column
//           field="amount"
//           header="Amount"
//           body={amountBodyTemplate}
//           sortable></Column>
//         <Column
//           field="status"
//           header="Status"
//           body={statusOrderBodyTemplate}
//           sortable></Column>
//         <Column
//           headerStyle={{ width: "4rem" }}
//           body={searchBodyTemplate}></Column>
//       </DataTable>
//     </div>
//   );
// };

// const header = (
//   <Button
//     icon={allExpanded ? "pi pi-minus" : "pi pi-plus"}
//     label={allExpanded ? "Collapse All" : "Expand All"}
//     onClick={toggleAll}
//     className="w-11rem"
//   />
// );

// const headerTemplate = (data) => {
//   return (
//     <React.Fragment>
//       <img
//         alt={data.representative.name}
//         src={`/demo/images/avatar/${data.representative.image}`}
//         width="32"
//         style={{ verticalAlign: "middle" }}
//       />
//       <span className="font-bold ml-2">{data.representative.name}</span>
//     </React.Fragment>
//   );
// };

// const footerTemplate = (data) => {
//   return (
//     <>
//       <td
//         colSpan="4"
//         style={{ textAlign: "right" }}
//         className="text-bold pr-6"
//       >
//         Total Customers
//       </td>
//       <td>{calculateCustomerTotal(data.representative.name)}</td>
//     </>
//   );
// };

// const calculateCustomerTotal = (name) => {
//   let total = 0;
//   if (customers3) {
//     for (const customer of customers3) {
//       if (customer.representative.name === name) {
//         total++;
//       }
//     }
//   }
//   return total;
// };

// const header1 = renderHeader1();

// return (
//   <>
//     <div className="grid crud-demo">
//       <div className="col-12">
//         <div className="card">
//           {/* <Toast ref={toast} /> */}
//           <Toolbar className="mb-4"></Toolbar>
//           <DataTable value={data}>
//             <Column field="Id" header="Project ID"></Column>
//             <Column field="Name" header="Name Project"></Column>
//             <Column field="Payment" header="Project Payment"></Column>
//             <Column field="Note" header="Note"></Column>
//             <Column field="TimeStart" header="Time Start"></Column>
//             <Column field="TimeEnd" header="Time End"></Column>
//           </DataTable>
//         </div>
//       </div>
//     </div>
//     {/* <Dialog
//         header={isNewTask ? "Add Task" : "Update Task"}
//         visible={dialogVisible}
//         style={{ width: "450px" }}
//         onHide={() => setDialogVisible(false)}
//       >
//         <div className="p-fluid">
//           <div className="p-field ">
//             <label>Task Name</label>
//             <InputText
//               value={task.UserMail}
//               onChange={(e) => setTask({ ...task, UserMail: e.target.value })}
//             />
//           </div>
//           <div className="p-field ">
//             <label>Project Id</label>
//             <InputNumber
//               value={task.ProjectId}
//               onChange={(e) => setTask({ ...task, ProjectId: e.value ?? 0 })}
//             />
//           </div>
//           <div className="p-field ">
//             <label>Status</label>
//             <InputNumber
//               value={task.Status}
//               onChange={(e) => setTask({ ...task, Status: e.value ?? 0 })}
//             />
//           </div>
//           <div className="p-field ">
//             <label>Note</label>
//             <InputText
//               value={task.Note}
//               onChange={(e) => setTask({ ...task, Note: e.target.value })}
//             />
//           </div>
//           <div className="p-field">
//             <label>Time start</label>
//             <Calendar
//               value={task.TimeStart} // Assuming task.date is your date value
//               onChange={(e) => setTask({ ...task, TimeStart: e.value || null })}
//             />
//           </div>
//           <div className="p-field">
//             <label>Time end</label>
//             <Calendar
//               value={task.TimeEnd} // Assuming task.date is your date value
//               onChange={(e) => setTask({ ...task, TimeEnd: e.value || null })}
//             />
//           </div>
//         </div>
//         <div className="p-d-flex text-right mt-4">
//           <Button
//             label="Save"
//             className="p-button-text"
//             onClick={handleAddOrUpdateTask}
//           />
//           <Button
//             label="Cancel"
//             className="p-button-text"
//             onClick={() => setDialogVisible(false)}
//           />
//         </div>
//       </Dialog> */}
//   </>
// );
// <div className="grid">
//   <div className="col-12">
//     <div className="card">
//       <h5>Filter Menu</h5>
//       <DataTable
//         value={customers1}
//         paginator
//         className="p-datatable-gridlines"
//         showGridlines
//         rows={10}
//         dataKey="id"
//         filters={filters1}
//         filterDisplay="menu"
//         loading={loading1}
//         responsiveLayout="scroll"
//         emptyMessage="No customers found."
//         header={header1}
//       >
//         <Column
//           field="ID"
//           header="ID"
//           filter
//           filterPlaceholder="Search by ID"
//           style={{ minWidth: "12rem" }}
//         />

//         <Column
//           field="name"
//           header="Name"
//           filter
//           filterPlaceholder="Search by name"
//           style={{ minWidth: "12rem" }}
//         />

//         <Column
//           field="Payment"
//           header="Payment"
//           filter
//           filterPlaceholder="Search by ID"
//           style={{ minWidth: "12rem" }}
//         />
//         {/* <Column
//           header="Country"
//           filterField="country.name"
//           style={{ minWidth: "12rem" }}
//           body={countryBodyTemplate}
//           filter
//           filterPlaceholder="Search by country"
//           filterClear={filterClearTemplate}
//           filterApply={filterApplyTemplate}
//         /> */}
//         {/* <Column
//           header="Agent"
//           filterField="representative"
//           showFilterMatchModes={false}
//           filterMenuStyle={{ width: "14rem" }}
//           style={{ minWidth: "14rem" }}
//           body={representativeBodyTemplate}
//           filter
//           filterElement={representativeFilterTemplate}
//         /> */}
//         <Column
//           header="Date"
//           filterField="date"
//           dataType="date"
//           style={{ minWidth: "10rem" }}
//           body={dateBodyTemplate}
//           filter
//           filterElement={dateFilterTemplate}
//         />
//         {/* <Column
//           header="Balance"
//           filterField="balance"
//           dataType="numeric"
//           style={{ minWidth: "10rem" }}
//           body={balanceBodyTemplate}
//           filter
//           filterElement={balanceFilterTemplate}
//         /> */}
//         <Column
//           field="status"
//           header="Status"
//           filterMenuStyle={{ width: "14rem" }}
//           style={{ minWidth: "12rem" }}
//           body={statusBodyTemplate}
//           filter
//           filterElement={statusFilterTemplate}
//         />
//         <Column
//           field="activity"
//           header="Activity"
//           showFilterMatchModes={false}
//           style={{ minWidth: "12rem" }}
//           body={activityBodyTemplate}
//           filter
//           filterElement={activityFilterTemplate}
//         />
//         <Column
//           field="verified"
//           header="Verified"
//           dataType="boolean"
//           bodyClassName="text-center"
//           style={{ minWidth: "8rem" }}
//           body={verifiedBodyTemplate}
//           filter
//           filterElement={verifiedFilterTemplate}
//         />
//       </DataTable>
//     </div>
//   </div>
// </div>
// };

// export default ProjectAdmin;
