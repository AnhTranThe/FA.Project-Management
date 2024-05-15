import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { getListTaskService } from "../../Services/taskServiceApi";
import { useAppSelector } from "../../hooks/ReduxHook";
import { IProjectModel } from "../../models/projectModel";
import { ITaskModel } from "../../models/taskModel";
import { IUserLogInInfoModel } from "../../models/userModel";
import { updateListProjectAction } from "../../store/action/projectAction";
import InfoDetailDashBoarc from "../Dashboard/InfoDetailDashBoarc";
import { getProjectByUserService } from "../../Services/projectServiceApi";
import { updateListTaskAction } from "../../store/action/taskAction";

export default function DetailServiceUser() {
  const { userLoginInfo }: { userLoginInfo: IUserLogInInfoModel } =
    useAppSelector((state) => state.userReducer);
  const location = useLocation();

  const [listProject, setListProject] = useState<IProjectModel[]>([]);
  const [listTask, setListTask] = useState<ITaskModel[]>([]);

  const handleGetListProject = async () => {
    const res = await getProjectByUserService(userLoginInfo.email);
    setListProject(res);
  };
  const handleGetlistTask = async () => {
    const res = await getListTaskService();
    setListTask(res);
  };

  const handleCheckSameDate = (day1: string, day2: string) => {
    const isvalid =
      dayjs(day1).isSame(day2, "year") && dayjs(day1).isSame(day2, "month");
    return isvalid;
  };

  useEffect(() => {
    handleGetListProject();
    handleGetlistTask();
  }, []);

  const handleGetDay = (time_start: string, time_end: string) => {
    const today = dayjs();
    const dayStart = dayjs(time_start);
    const dayEnd = dayjs(time_end);
    return {
      today,
      dayStart,
      dayEnd,
    };
  };

  const handleProjectByUser = () => {
    const newData = listProject.filter((ele: IProjectModel) => {
      const { today, dayEnd } = handleGetDay(ele.time_start, ele.time_end);
      if (
        dayEnd.isAfter(today) &&
        handleCheckSameDate(today.toString(), dayEnd.toString()) &&
        today.diff(dayEnd, "day") < 7
      ) {
        return ele;
      }
    });
    return newData;
  };

  const hanldeTaskByUser = () => {
    const newData = listTask.filter((ele: ITaskModel) => {
      const { today, dayEnd } = handleGetDay(ele.time_start, ele.time_end);
      const checkDay = today.diff(dayEnd, "day") <= 7;
      if (checkDay && userLoginInfo.email === ele.user_mail) {
        return ele;
      }
    });

    return newData;
  };

  return (
    <div className="">
      <h2 className="text-center mt-5 font-bold">Detail User Service</h2>
      <div className="grid p-5">
        <div className="col-12">
          <div className="card mb-0 h-full">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3 font-bold text-xl">
                  User: {userLoginInfo.email}
                </span>
                <div className="text-900 font-medium text-xl">
                  Role: {userLoginInfo.role !== 1 ? "User" : "Admin"}
                </div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-orange-100 border-round"
                style={{ width: "2.5rem", height: "2.5rem" }}>
                <i className="pi pi-map-marker text-orange-500 text-xl" />
              </div>
            </div>

            <InfoDetailDashBoarc
              count={handleProjectByUser().length ?? 0}
              label="Project user need realease in 7 days"
              listDetail={handleProjectByUser()}
              action={updateListProjectAction}
              to="/client/user-service/project"
            />

            <InfoDetailDashBoarc
              count={hanldeTaskByUser().length ?? 0}
              label="Task user need realease in 7 days"
              listDetail={hanldeTaskByUser()}
              action={updateListTaskAction}
              to="/client/user-service/task"
            />
          </div>
        </div>
        <div className="col-12">
          {location.pathname === "/client/user-service" ? (
            <p>No Data</p>
          ) : (
            <div className="card mb-0 h-full">
              <Outlet />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
