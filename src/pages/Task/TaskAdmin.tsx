import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../hooks/ReduxHook";
import { ITaskModel } from "../../models/taskModel";
import {
    createTask,
    deleteTask,
    getTaskAll,
    updateTask,
} from "../../store/action/taskAction";
import { useAppDispatch } from "../../store/store";



export default function TaskAdmin() {
    const emptyTask: ITaskModel = {
        Id: null,
        UserMail: "",
        ProjectId: 0,
        Status: 0,
        Note: "",
        TimeStart: null,
        TimeEnd: null,
    };
    const dispatch = useAppDispatch();
    const { data }: { data: ITaskModel[] } = useAppSelector(
        (state) => state.taskReducer
    );
    const [dialogVisible, setDialogVisible] = useState(false);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [task, setTask] = useState<ITaskModel>(emptyTask);
    const [selectedTask, setSelectedTask] = useState<ITaskModel | null>(null);
    const [taskToDelete, setTaskToDelete] = useState<ITaskModel | null>(null);
    const [globalFilter, setGlobalFilter] = useState("");
    const toast = useRef<Toast>(null);
    const [isNewTask, setIsNewTask] = useState(true);
    useEffect(() => {
        dispatch(getTaskAll());
    }, []);
    const handleAddOrUpdateTask = () => {
        const taskData: ITaskModel = {
            Id: task.Id,
            UserMail: task.UserMail,
            ProjectId: task.ProjectId,
            TimeStart: task.TimeStart,
            TimeEnd: task.TimeEnd,
            Status: task.Status,
            Note: task.Note,
        };

        if (isNewTask) {
            try {
                dispatch(createTask(taskData));
                toast.current?.show({
                    severity: "success",
                    summary: "Successful",
                    detail: "task created successfully",
                    life: 2000,
                });


            } catch (error) {
                toast.current?.show({
                    severity: "error",
                    summary: "Error",
                    detail: "Failed to create new task",
                    life: 2000,
                });

            }

        } else {
            try {
                dispatch(updateTask(taskData));
                toast.current?.show({
                    severity: "success",
                    summary: "Successful",
                    detail: "task updated successfully",
                    life: 2000,
                });

            } catch (error) {
                toast.current?.show({
                    severity: "error",
                    summary: "Error",
                    detail: "Failed to update task",
                    life: 2000,
                });
            }

        }
        setDialogVisible(false);
    };
    const handleDeleteTask = (task: ITaskModel) => {
        setTaskToDelete(task);
        setDeleteDialogVisible(true); // Open the confirmation dialog
    };
    const confirmDelete = () => {
        if (taskToDelete) {
            try {
                dispatch(deleteTask(taskToDelete?.Id ?? 0));
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


    const openDialogForCreate = () => {
        setDialogVisible(true);
        setIsNewTask(true);
        setSelectedTask(null);
        setTask(emptyTask)
    };
    const openDialogForUpdate = (Task: ITaskModel) => {
        setDialogVisible(true);
        setIsNewTask(false);
        setSelectedTask(Task);
        setTask(task)
    };
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" onClick={() => { openDialogForCreate() }} icon="pi pi-plus" severity="success" className=" mr-2" />
                </div>
            </React.Fragment>
        );
    };
    //   const onCategoryChange = (e: RadioButtonChangeEvent) => {
    //     let _product = { ...product };
    //     _product["category"] = e.value;
    //     setProduct(_product);
    //   };

    //   const onInputChange = (
    //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    //     name: string
    //   ) => {
    //     const val = (e.target && e.target.value) || "";
    //     let _product = { ...product };
    //     _product[`${name}`] = val;

    //     setProduct(_product);
    //   };

    //   const onInputNumberChange = (
    //     e: InputNumberValueChangeEvent,
    //     name: string
    //   ) => {
    //     const val = e.value || 0;
    //     let _product = { ...product };
    //     _product[`${name}`] = val;

    //     setProduct(_product);
    //   };

    return (
        <>

            <div className="grid crud-demo">
                <div className="col-12">
                    <div className="card">
                        <Toast ref={toast} />
                        <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
                        <DataTable value={data}>
                            <Column field="Id" header="ID"></Column>
                            <Column field="UserMail" header="User mail"></Column>
                            <Column field="ProjectId" header="Project ID"></Column>
                            <Column field="Status" header="Status"></Column>
                            <Column field="Note" header="Note"></Column>
                            <Column field="TimeStart" header="Time Start"></Column>
                            <Column field="TimeEnd" header="Time End"></Column>


                            <Column header="Actions" body={(rowData: ITaskModel) => (
                                <div className="flex-nowrap flex">
                                    {/* Update Button */}
                                    <Button icon="pi pi-pencil" label="Update" className="p-button-rounded p-button-success p-mr-2 " onClick={() => openDialogForUpdate(rowData)} />
                                    {/* Delete Button */}
                                    <Button icon="pi pi-trash" label="Delete" className="p-button-rounded p-button-danger" style={{ marginLeft: '.5rem' }} onClick={() => handleDeleteTask(rowData)} />
                                </div>
                            )} />
                        </DataTable>
                    </div>
                </div>
            </div>

            <Dialog header={isNewTask ? "Add Task" : "Update Task"} visible={dialogVisible} style={{ width: '450px' }} onHide={() => setDialogVisible(false)}>
                <div className="p-fluid">
                    <div className="p-field ">
                        <label>Task Name</label>
                        <InputText value={task.UserMail} onChange={(e) => setTask({ ...task, UserMail: e.target.value })} />
                    </div>
                    <div className="p-field ">
                        <label >Project Id</label>
                        <InputNumber value={task.ProjectId} onChange={(e) => setTask({ ...task, ProjectId: e.value ?? 0 })} />
                    </div>
                    <div className="p-field ">
                        <label >Status</label>
                        <InputNumber value={task.Status} onChange={(e) => setTask({ ...task, Status: e.value ?? 0 })} />
                    </div>
                    <div className="p-field ">
                        <label>Note</label>
                        <InputText value={task.Note} onChange={(e) => setTask({ ...task, Note: e.target.value })} />
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
                    <Button label="Save" className="p-button-text" onClick={handleAddOrUpdateTask} />
                    <Button label="Cancel" className="p-button-text" onClick={() => setDialogVisible(false)} />

                </div>
            </Dialog>

            <Dialog
                header="Confirm Delete"
                visible={deleteDialogVisible}
                style={{ width: '30vw' }}
                onHide={() => setDeleteDialogVisible(false)}
                footer={
                    <div className="text-right">
                        <Button label="Yes" icon="pi pi-check" onClick={confirmDelete} autoFocus />
                        <Button label="No" icon="pi pi-times" onClick={() => setDeleteDialogVisible(false)} className="p-button-text" />

                    </div>
                }
            >
                <p>Are you sure you want to delete this product?</p>
            </Dialog>
        </>



    );
}
