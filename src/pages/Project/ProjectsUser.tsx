/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/ReduxHook";
import { useAppDispatch } from "../../store/store";

import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { useContext, useEffect, useState } from "react";
import {
  createProjectService,
  deleteProjectService,
  getListProjectService,
  getProjectByUserService,
} from "../../Services/projectServiceApi";
import { getListUserService } from "../../Services/userServiceApi";
import { IProjectModel } from "../../models/projectModel";
import { IUserListModel } from "../../models/userListModel";
import { IUserLogInInfoModel } from "../../models/userModel";
import { selectedProjectItem } from "../../store/action/projectAction";
import { getTasksByProject } from "../../store/action/taskAction";
import { getListUserJoinInProjectAction } from "../../store/action/userAction";
import {
  formatDateTime,
  generateRandomImageProject,
} from "../../utils/Utilities";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { validateProject } from "../../utils/yup";
import { IToastValueContext, ToastContext } from "../context/toastContext";

export default function ProjectsUser() {
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const [createDialog, setCreateDialog] = useState(false);
  const [listUser, setListUser] = useState<IUserListModel[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [projectByUserLs, setProjectByUserLs] = useState<IProjectModel[]>([]);

  const { setShowModelToast } = useContext<IToastValueContext>(ToastContext);
  const { IsDarkTheme }: { IsDarkTheme: boolean } = useAppSelector(
    (state) => state.themeReducer
  );
  const { userLoginInfo }: { userLoginInfo: IUserLogInInfoModel } =
    useAppSelector((state) => state.userReducer);

  const onIngredientsChange = (e: CheckboxChangeEvent) => {
    let _ingredients = [...ingredients];

    if (e.checked) _ingredients.push(e.value);
    else _ingredients.splice(_ingredients.indexOf(e.value), 1);

    setIngredients(_ingredients);
  };

  const handleReloadData = async () => {
    if (userLoginInfo.role !== 1) {
      const result = await getProjectByUserService(userLoginInfo.email);
      setProjectByUserLs(result);
    } else {
      const result = await getListProjectService();
      setProjectByUserLs(result);
    }
  };

  const handleGetListUser = async () => {
    const res = await getListUserService();
    if (res) {
      setListUser(res);
    }
  };

  useEffect(() => {
    handleReloadData();
    handleGetListUser();
  }, []);

  const handleSelectedProjectItem =
    (project: IProjectModel) => (_: React.MouseEvent<HTMLDivElement>) => {
      dispatch(selectedProjectItem(project));
      dispatch(getTasksByProject(project.id ?? ""));
      dispatch(getListUserJoinInProjectAction(project.id ?? ""));
      nav(`/client/projects/${project.id}/board`);
    };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
    resetForm,
  } = useFormik({
    initialValues: {
      name: "",
      payment: 100000,
      time_start: dayjs(new Date()).format("DD/MM/YYYY"),
      time_end: dayjs(new Date()).format("DD/MM/YYYY"),
      note: "",
      priority: 1,
    },
    validationSchema: validateProject,
    onSubmit: async (value) => {
      if (ingredients.length === 0) {
        setShowModelToast({
          severity: "warn",
          summary: "Warning",
          detail: "pls!! add user in project",
        });
        return;
      }

      const newData = {
        ...value,
        arrSelectedUser: ingredients.map((ele: string, index: number) => {
          if (index === 0) {
            return {
              user_id: ele,
              is_host: true,
            };
          } else {
            return {
              user_id: ele,
              is_host: false,
            };
          }
        }),
      };

      const res = await createProjectService(newData);
      if (res.code === 200) {
        setShowModelToast({
          severity: "success",
          summary: "Success",
          detail: "Create Project Success",
        });
        await handleReloadData();
        resetForm();
        setIngredients([]);
        setCreateDialog(false);
      } else {
        setShowModelToast({
          severity: "warn",
          summary: "Warning",
          detail: `${res?.message || "Something Wrong"}`,
        });
      }
    },
  });

  const handleDeleteProject = async (id: string) => {
    if (id === "") return;

    const res = await deleteProjectService(id);
    if (res.code === 200) {
      setShowModelToast({
        severity: "success",
        summary: "Success",
        detail: "Delete Project Success",
      });
      await handleReloadData();
    } else {
      setShowModelToast({
        severity: "warn",
        summary: "Warning",
        detail: `${res?.message || "Something Wrong"}`,
      });
    }
  };

  return (
    <div className="ProjectUser">
      <div className="p-6">
        <h1 className="font-primary-black text-2xl font-bold">
          {userLoginInfo.user_name.toUpperCase()} 'S PROJECTS
        </h1>
        {userLoginInfo.role === 1 ? (
          <div className="mt-5">
            <Button
              color="neutral"
              className="py-3 pl-3 pr-4"
              onClick={() => setCreateDialog(true)}>
              <span className="pi pi-plus"></span>
              <span className="pl-2">Add Project</span>
            </Button>
          </div>
        ) : null}

        <div id="features" className="py-4 px-4 lg:px-8 mt-5 mx-0 lg:mx-8">
          <div className="grid justify-content-center">
            {projectByUserLs?.map((project) => (
              <div
                key={project.id}
                className="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 lg:pb-5 mt-4 lg:mt-0 relative">
                <div
                  style={{
                    padding: "2px",
                    borderRadius: "10px",
                    background:
                      "linear-gradient(90deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2))",
                  }}
                  onClick={handleSelectedProjectItem(project)}>
                  <div
                    className={`p-3 surface-card h-full cursor-pointer  ${
                      IsDarkTheme
                        ? "hover-item-dark-effect"
                        : "hover-item-light-effect"
                    } `}
                    style={{ borderRadius: "8px" }}>
                    <div className="flex justify-content-between">
                      <div
                        className="flex align-items-center justify-content-center  mb-3"
                        style={{
                          width: "3.5rem",
                          height: "3.5rem",
                          borderRadius: "10px",
                          backgroundImage: `url(${generateRandomImageProject()})`,
                        }}></div>
                    </div>

                    <h5 className="mb-2 text-900">{project.name}</h5>
                    <span className="text-600">
                      Start: {formatDateTime(project.time_start)} -
                    </span>
                    <span className="text-600">
                      {" "}
                      End: {formatDateTime(project.time_end)}
                    </span>
                  </div>
                </div>
                {userLoginInfo.role === 1 ? (
                  <Button
                    icon="pi pi-times"
                    rounded
                    severity="danger"
                    aria-label="Cancel"
                    className="absolute z-2 button__delete"
                    onClick={() =>
                      handleDeleteProject(project.id ? project.id : "")
                    }
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Dialog
        header="Creat New Project"
        visible={createDialog}
        className="w-8"
        onHide={() => setCreateDialog(false)}>
        <form
          className="form__project flex flex-column gap-5"
          onSubmit={handleSubmit}>
          <div>
            <input
              id="name"
              type="text"
              name="name"
              defaultValue={values.name}
              placeholder="Write your name project..."
              className="w-full px-3 py-3 font-bold text-xl card mb-2"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.name && touched.name && (
              <p className="text-red-500">{errors.name}</p>
            )}
          </div>
          <div className="flex flex-column">
            <label htmlFor="note" className="ml-1 mb-2">
              Note
            </label>
            <input
              type="text"
              name="note"
              defaultValue={values.note}
              placeholder="Add a note..."
              className="px-3 py-3 font-bold card mb-2"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.note && touched.note && (
              <p className="text-red-500">{errors.note}</p>
            )}
          </div>
          <div className="card__container card flex flex-column flex-wrap justify-content-center gap-3">
            <h5 className="font-bold underline">First Select is Host</h5>
            {listUser?.map((ele: IUserListModel) => {
              if (ele.role !== 1) {
                return (
                  <div
                    className="card__item flex align-items-center justify-content-between px-2 py-3 font-bold cursor-pointer"
                    key={ele.id}>
                    <label
                      htmlFor={`${ele.name}`}
                      className="ml-2 cursor-pointer">
                      {ele.email}
                    </label>
                    <Checkbox
                      inputId={`${ele.name}`}
                      name="pizza"
                      value={ele.id}
                      onChange={onIngredientsChange}
                      checked={ingredients.includes(`${ele.id}`)}
                    />
                  </div>
                );
              }
            })}
          </div>
          <div className="text-center">
            <Button label="Accept" icon="pi pi-check" type="submit" autoFocus />
          </div>
        </form>
      </Dialog>
    </div>
  );
}
