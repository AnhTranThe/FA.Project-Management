/* eslint-disable @typescript-eslint/no-explicit-any */
import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { useContext, useState } from "react";
import { useAppSelector } from "../../hooks/ReduxHook";
import { IColumnTaskBoardModel } from "../../models/commonModel";
import { IProjectModel } from "../../models/projectModel";
import { ITaskModel } from "../../models/taskModel";
import { createTask, getTasksByProject, updateTask } from "../../store/action/taskAction";
import { useAppDispatch } from "../../store/store";
import { validateTask } from "../../utils/yup";
import { IToastValueContext, ToastContext } from "../context/toastContext";
import TaskBoardAddEditDialog from "./TaskBoardAddEditDialog";
import TaskBoardItem from "./TaskBoardItem";

export default function TaskBoardColumn({ title, tasks, column, id, taskIds }: { title?: string, tasks: ITaskModel[], column: IColumnTaskBoardModel, id: string, taskIds: UniqueIdentifier[] }) {
    const [isNewTask, setIsNewTask] = useState(true);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const { setShowModelToast } = useContext<IToastValueContext>(ToastContext);
    const [taskID, setTaskID] = useState("");
    const [detailTask, setDetailTask] = useState<ITaskModel>({
        id: "",
        user_mail: "",
        project_id: "",
        time_start: "",
        time_end: "",
        status: 0,
        note: "",
    });
    const { setNodeRef } = useDroppable({
        id
    });


    const dispatch = useAppDispatch();
    const { selectedProject }: { selectedProject: IProjectModel | null } = useAppSelector((state) => state.projectReducer);



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
        const res = await dispatch(createTask(data));
        if (res?.success) {
            setShowModelToast({
                severity: "success",
                summary: "Success",
                detail: "Create Task Success",
            });
            await dispatch(getTasksByProject(selectedProject?.id ?? ""));
            setDialogVisible(false);
        } else {
            setShowModelToast({
                severity: "warn",
                summary: "Warning",
                detail: `${res?.error || "Something Wrong"}`,
            });
        }
    };
    const handleUpdateTask = async (data: ITaskModel) => {
        const res = await dispatch(updateTask(data));
        if (res?.success) {
            setShowModelToast({
                severity: "success",
                summary: "Success",
                detail: "Update Task Success",
            });
            await dispatch(getTasksByProject(selectedProject?.id ?? ""));
            setDialogVisible(false);
        } else {
            setShowModelToast({
                severity: "warn",
                summary: "Warning",
                detail: `${res?.error || "Something Wrong"}`,
            });
        }
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
    const openDialogForCreate = () => {
        handleCancel();
        setDialogVisible(true);
        setIsNewTask(true);
    };

    return (
        <div className="client-board-column col-3 border-round ">
            <div className="justify-content-between  mt-8 md:mt-0 ">

                <div className="h-full flex flex-column gap-3 mx-1 pb-3">
                    <div className="flex justify-content-between align-items-center   ">
                        <span className="flex gap-2">
                            <span>{title}</span>
                            {tasks.length > 0 && <span> ({tasks.length})</span>}
                        </span>


                        <Button onClick={openDialogForCreate} icon="pi pi-plus" rounded text aria-label="Filter" size="small" />
                    </div>

                </div>

                {/* <div className="h-full flex flex-column gap-3 mx-1 pb-3 overflow-hidden max-h-30rem overflow-y-scroll overflow-x-hidden">
                    {tasks.map((task, index) => (


                        <div key={index} className="w-full cursor-pointer border-round border-none client-board-column-item px-2 py-2">
                            <p className="py-2">{task.note}</p>
                            <div className="flex align-items-center justify-content-between py-3">
                                <span className="pi pi-check-square  "></span>
                                <span className="pi pi-flag"></span>
                            </div>
                            <p className="text-xs">{task.id}</p>
                        </div>
                    ))}

                </div> */}
                <div className="h-full flex flex-column gap-3 mx-1 pb-3 overflow-hidden max-h-30rem overflow-y-scroll overflow-x-hidden">
                    <SortableContext
                        id={id}
                        items={tasks}
                        strategy={verticalListSortingStrategy}
                    >
                        <div ref={setNodeRef} >
                            {tasks.map((task) => (
                                <TaskBoardItem task={task} key={task.id} id={task.id} />
                            ))}
                        </div>
                    </SortableContext>

                </div>


                <TaskBoardAddEditDialog isNewTask={isNewTask} dialogVisible={dialogVisible} onHide={() => {
                    setDialogVisible(false);
                    handleCancel();
                }} /> </div>
        </div>





    )
}
