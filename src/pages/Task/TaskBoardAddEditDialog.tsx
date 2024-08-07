import dayjs from "dayjs";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { getListProjectService } from "../../Services/projectServiceApi";
import { createNewTaskService, updateTaskService } from "../../Services/taskServiceApi";
import { getListUserService } from "../../Services/userServiceApi";
import { useAppSelector } from "../../hooks/ReduxHook";
import { IProjectModel } from "../../models/projectModel";
import { ITaskModel } from "../../models/taskModel";
import { IUserListModel } from "../../models/userListModel";
import { getTasksByProject } from "../../store/action/taskAction";
import { useAppDispatch } from "../../store/store";
import { validateTask } from "../../utils/yup";
import { IToastValueContext, ToastContext } from "../context/toastContext";





const TaskBoardAddEditDialog = (({ isNewTask, dialogVisible, onHide, detailTask }: { isNewTask: boolean, dialogVisible: boolean, onHide: () => void, detailTask: ITaskModel }) => {
    const { setShowModelToast } = useContext<IToastValueContext>(ToastContext);
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

    const [listUser, setListUser] = useState<{ email: string }[]>([]);
    const [listProject, setListProject] = useState<
        { id: string; name: string }[]
    >([]);
    const [colorSelect, setColoSelect] = useState("");
    const dispatch = useAppDispatch();
    const { selectedProject }: { selectedProject: IProjectModel | null } = useAppSelector((state) => state.projectReducer);
    const handleGetListUser = async () => {
        const resUser = await getListUserService();
        const newListUser = resUser?.map((ele: IUserListModel) => {
            return {
                email: ele.email,
            };
        });
        setListUser(newListUser);
    };
    const hanldeSelectStatus = (event: ChangeEvent<HTMLSelectElement>) => {
        setFieldValue(event.target.name, +event.target.value);
    };
    const handleGetListProject = async () => {
        const resProject = await getListProjectService();
        const newListProject = resProject?.map((ele: IProjectModel) => {
            return { id: ele.id, name: ele.name };
        });
        setListProject(newListProject);
    };

    useEffect(() => {
        handleGetListUser();
        handleGetListProject();
    }, []);
    useEffect(() => {
        switch (values.status + "") {
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
    }, [values.status]);


    const handleChangeSelectTask = (event: ChangeEvent<HTMLSelectElement>) => {
        setFieldValue(event.target.name, event.target.value);
    };
    const handleCreateNewTask = async (data: ITaskModel) => {
        const res = await createNewTaskService(data);
        if (res?.code === 200) {
            setShowModelToast({
                severity: "success",
                summary: "Success",
                detail: "Create Task Success",
            });
            await dispatch(getTasksByProject(selectedProject?.id ?? ""));
            onHide()
        } else {
            setShowModelToast({
                severity: "warn",
                summary: "Warning",
                detail: `${res?.error || "Something Wrong"}`,
            });
        }
    };
    const handleUpdateTask = async (data: ITaskModel) => {
        const res = await updateTaskService(data);
        console.log(res)
        if (res?.code === 200) {
            setShowModelToast({
                severity: "success",
                summary: "Success",
                detail: "Update Task Success",
            });
            await dispatch(getTasksByProject(selectedProject?.id ?? ""));
            onHide()
        } else {

            setShowModelToast({
                severity: "warn",
                summary: "Warning",
                detail: `${res?.error || "Something Wrong"}`,
            });
        }
    };
    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {

        setFieldValue(event.target.name, event.target.value);
    };
    return (
        <>
            <Dialog
                header={isNewTask ? "Create new issue" : "Update Task"}
                visible={dialogVisible}
                style={{ width: "550px" }}
                onHide={onHide}>
                <form className="p-fluid" onSubmit={handleSubmit}>
                    <div className="p-field  my-4">
                        <label>User Email</label>
                        <select
                            className="w-full px-2 py-2 border-round mt-2"
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
                            className="w-full px-2 py-2 border-round mt-2"
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
                        <select
                            className="px-3 py-2 w-full mt-2"
                            name="status"
                            id="status"
                            value={values.status + "" || "1"}
                            style={{ backgroundColor: `${colorSelect}`, color: "black" }}
                            onChange={hanldeSelectStatus}>
                            <option value="0" className="p-button p-button-info">pls choose status</option>
                            <option value="1" className="p-button p-button-success">
                                To-do
                            </option>
                            <option value="2" className="p-button p-button-warning">
                                In-Progress
                            </option>
                            <option value="3" className="p-button p-button-danger">
                                Done
                            </option>
                        </select>
                        {errors.status && touched.status && (
                            <span className="text-red-500">{errors.status}</span>
                        )}
                    </div>
                    <div className="p-field  my-4">
                        <label>Note</label>
                        <br />
                        <input
                            defaultValue={values.note}
                            className="px-3 py-2 w-full mt-2"
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
                            className="px-3 py-2 w-full mt-2"
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
                            className="px-3 py-2 w-full mt-2"
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
                                    onHide();
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

        </>
    )
})

export default TaskBoardAddEditDialog