import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getListProjectService } from "../Services/projectServiceApi";
import { getListTaskService } from "../Services/taskServiceApi";
import { getListUserService } from "../Services/userServiceApi";
import InfoDetailDashBoarc from "../components/Dashboard/InfoDetailDashBoarc";
import { IProjectModel } from "../models/projectModel";
import { ITaskModel } from "../models/taskModel";
import { IUserListModel } from "../models/userListModel";
import { updateListProjectAction } from "../store/action/projectAction";
import { updateListTaskAction } from "../store/action/taskAction";
import { getListUserServiceAction } from "../store/action/userAction";
import { Chart } from "primereact/chart";

const Dashboard = () => {
  const [listUser, setListUser] = useState<IUserListModel[]>([]);
  const [listProject, setListProject] = useState<IProjectModel[]>([]);
  const [listTask, setListTask] = useState<ITaskModel[]>([]);

  const handleGetlistUser = async () => {
    const res = await getListUserService();
    setListUser(res);
  };
  const handleGetListProject = async () => {
    const res = await getListProjectService();
    setListProject(res);
  };
  const handleGetlistTask = async () => {
    const res = await getListTaskService();
    setListTask(res);
  };

  useEffect(() => {
    handleGetListProject();
    handleGetlistTask();
    handleGetlistUser();
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
  const handleCheckSameDate = (day1: string, day2: string) => {
    const isvalid =
      dayjs(day1).isSame(day2, "year") && dayjs(day1).isSame(day2, "month");
    return isvalid;
  };

  const handleUserEmptyTask = () => {
    if (listUser.length > 0 && listTask.length > 0) {
      const newData = listUser.filter((ele) => {
        const userNotInTask = !listTask.some(
          (task) => task.user_mail === ele.email
        );
        if (userNotInTask) {
          return ele;
        }
      });
      return newData;
    }
  };

  const handleUserCompleteTask7Days = () => {
    const newData = listTask.filter((ele: ITaskModel) => {
      const { today, dayEnd } = handleGetDay(ele.time_start, ele.time_end);
      if (dayEnd.isAfter(today) && dayEnd.diff(today, "day") < 7) {
        return ele;
      }
    });
    const userData = [
      ...new Set(
        newData.map((ele: ITaskModel) => {
          return ele.user_mail;
        })
      ),
    ];
    const userlist = listUser.filter((ele: IUserListModel) => {
      if (userData.some((e: string) => e === ele.email)) {
        return ele;
      }
    });

    return { count: userData.length, userlist };
  };

  const handleProjectInProgress = () => {
    const newData = listProject.filter((ele: IProjectModel) => {
      const { today, dayEnd, dayStart } = handleGetDay(
        ele.time_start,
        ele.time_end
      );
      if (dayStart.isBefore(today) && dayEnd.isAfter(today)) {
        return ele;
      }
    });
    return newData;
  };

  const handleProjectRelease7day = () => {
    const newData = listProject.filter((ele: IProjectModel) => {
      const { today, dayEnd } = handleGetDay(ele.time_start, ele.time_end);
      if (
        dayEnd.isAfter(today) &&
        handleCheckSameDate(today.toString(), dayEnd.toString()) &&
        dayEnd.diff(today, "day") < 7
      ) {
        return ele;
      }
    });
    return newData;
  };

  const handleProjectPriority = () => {
    const newData = listProject.filter((ele: IProjectModel) => {
      return ele.priority === 3;
    });
    return newData;
  };

  const handleTasklateDeadline = () => {
    const newData = listTask.filter((ele: ITaskModel) => {
      const { today, dayEnd } = handleGetDay(ele.time_start, ele.time_end);
      if (dayEnd.isBefore(today) && ele.status !== 3) {
        return ele;
      }
    });
    return newData;
  };

  const handleTaskWait = () => {
    const newData = listTask.filter((ele: ITaskModel) => {
      const { today, dayStart } = handleGetDay(ele.time_start, ele.time_end);
      if (today.isBefore(dayStart)) {
        return ele;
      }
    });
    return newData;
  };

  const hanldeTaskInProgress = () => {
    const newData = listTask.filter((ele: ITaskModel) => {
      const { today, dayEnd } = handleGetDay(ele.time_start, ele.time_end);
      if (dayEnd.isAfter(today)) {
        return ele;
      }
    });
    return newData;
  };

  const handleTaskCompleteIn3Days = () => {
    const newData = listTask.filter((ele: ITaskModel) => {
      const { today, dayEnd } = handleGetDay(ele.time_start, ele.time_end);
      if (
        dayEnd.isAfter(today) &&
        handleCheckSameDate(today.toString(), dayEnd.toString()) &&
        dayEnd.diff(today, "day") < 3
      ) {
        return ele;
      }
    });
    return newData;
  };

  const dataUser = {
    labels: ["user no task", "user need complete 7 days"],
    datasets: [
      {
        label: "Sales",
        data: [
          handleUserEmptyTask()?.length,
          handleUserCompleteTask7Days().count,
        ],
        backgroundColor: [
          "rgba(255, 159, 64, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          // "rgba(54, 162, 235, 0.2)",
          // "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgb(255, 159, 64)",
          "rgb(75, 192, 192)",
          // "rgb(54, 162, 235)",
          // "rgb(153, 102, 255)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const dataProject = {
    labels: [
      "project running",
      "project need complete 7 days",
      "project priority",
    ],
    datasets: [
      {
        label: "Sales",
        data: [
          handleProjectInProgress()?.length,
          handleProjectRelease7day()?.length,
          handleProjectPriority()?.length,
        ],
        backgroundColor: [
          // "rgba(255, 159, 64, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          // "rgb(255, 159, 64)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const dataTask = {
    labels: [
      "task late deadline",
      "task wait start",
      "task running",
      "task complete 3 days",
    ],
    datasets: [
      {
        label: "Sales",
        data: [
          handleTasklateDeadline()?.length,
          handleTaskWait()?.length,
          hanldeTaskInProgress()?.length,
          handleTaskCompleteIn3Days()?.length,
        ],
        backgroundColor: [
          "rgba(255, 159, 64, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgb(255, 159, 64)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="grid">
      <div className="col-12 lg:col-6 xl:col-6">
        <div className="card mb-0 h-full">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3 font-bold text-xl">
                Users
              </span>
              <div className="text-900 font-medium text-xl">
                {listUser?.length} Active
              </div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-blue-100 border-round"
              style={{ width: "2.5rem", height: "2.5rem" }}>
              <i className="pi pi-user text-blue-500 text-xl" />
            </div>
          </div>
          <InfoDetailDashBoarc
            count={handleUserEmptyTask()?.length ?? 0}
            label="User don't have task"
            listDetail={handleUserEmptyTask()}
            action={getListUserServiceAction}
            to="user"
          />
          <InfoDetailDashBoarc
            count={handleUserCompleteTask7Days()?.count ?? 0}
            label="User need complete task in 7 days"
            listDetail={handleUserCompleteTask7Days()?.userlist}
            action={getListUserServiceAction}
            to="user"
          />
          <Chart type="pie" data={dataUser} options={options} />
        </div>
      </div>
      <div className="col-12 lg:col-6 xl:col-6">
        <div className="card mb-0 h-full">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3 font-bold text-xl">
                Projects
              </span>
              <div className="text-900 font-medium text-xl">
                {listProject?.length} total
              </div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-orange-100 border-round"
              style={{ width: "2.5rem", height: "2.5rem" }}>
              <i className="pi pi-map-marker text-orange-500 text-xl" />
            </div>
          </div>

          <InfoDetailDashBoarc
            count={handleProjectInProgress().length ?? 0}
            label="Project running"
            listDetail={handleProjectInProgress()}
            action={updateListProjectAction}
            to="/dashboard/project"
          />

          <InfoDetailDashBoarc
            count={handleProjectRelease7day()?.length ?? 0}
            label="Project need complete in 7 days"
            listDetail={handleProjectRelease7day()}
            action={updateListProjectAction}
            to="/dashboard/project"
          />

          <InfoDetailDashBoarc
            count={handleProjectPriority()?.length ?? 0}
            label="Project priority"
            listDetail={handleProjectPriority()}
            action={updateListProjectAction}
            to="/dashboard/project"
          />
          <Chart type="pie" data={dataProject} options={options} />
        </div>
      </div>
      <div className="col-12 lg:col-6 xl:col-12">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3 font-bold text-xl">
                Tasks
              </span>
              <div className="text-900 font-medium text-xl">
                {listTask?.length} Total
              </div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-cyan-100 border-round"
              style={{ width: "2.5rem", height: "2.5rem" }}>
              <i className="pi pi-inbox text-cyan-500 text-xl" />
            </div>
          </div>

          <InfoDetailDashBoarc
            count={handleTasklateDeadline()?.length ?? 0}
            label="Task late deadline"
            listDetail={handleTasklateDeadline()}
            action={updateListTaskAction}
            to="/dashboard/task"
          />

          <InfoDetailDashBoarc
            count={handleTaskWait()?.length ?? 0}
            label="Task Wait Start"
            listDetail={handleTaskWait()}
            action={updateListTaskAction}
            to="/dashboard/task"
          />
          <InfoDetailDashBoarc
            count={hanldeTaskInProgress()?.length ?? 0}
            label="Task is running"
            listDetail={hanldeTaskInProgress()}
            action={updateListTaskAction}
            to="/dashboard/task"
          />
          <InfoDetailDashBoarc
            count={handleTaskCompleteIn3Days()?.length ?? 0}
            label="Task need complete in 3 days"
            listDetail={handleTaskCompleteIn3Days()}
            action={updateListTaskAction}
            to="/dashboard/task"
          />
          <Chart
            style={{ width: "500px" }}
            type="pie"
            data={dataTask}
            options={options}
          />
        </div>
      </div>
      <div className="col-12" id="rowBottom">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
