/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import dayjs from "dayjs";
import { Button } from "primereact/button";
import { useCallback, useState } from "react";
import { useAppSelector } from "../../hooks/ReduxHook";

import { ITaskModel } from "../../models/taskModel";
import { IUserLogInInfoModel } from "../../models/userModel";
import TaskBoardAddEditDialog from "./TaskBoardAddEditDialog";
import TaskBoardItem from "./TaskBoardItem";

export default function TaskBoardColumn({
  title,
  tasks,
  id,
}: {
  title?: string;
  tasks: ITaskModel[];
  id: string;
}) {
  const [isNewTask, setIsNewTask] = useState(true);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [detailTask, setDetailTask] = useState<ITaskModel>({
    id: "",
    user_mail: "",
    project_id: "",
    time_start: "",
    time_end: "",
    status: 0,
    note: "",
  });

  const { userLoginInfo }: { userLoginInfo: IUserLogInInfoModel } =
    useAppSelector((state) => state.userReducer);

  const { setNodeRef } = useDroppable({
    id: id,
  });

  const openDialogForCreate = () => {
    setDetailTask({
      id: "",
      user_mail: "",
      project_id: "",
      time_start: "",
      time_end: "",
      status: 0,
      note: "",
    });
    setDialogVisible(true);
    setIsNewTask(true);
  };
  const openDialogForUpdate = (task: ITaskModel) => {
    const updatedData = {
      id: task.id,
      user_mail: task.user_mail,
      project_id: task.project_id,
      time_start: dayjs(task.time_start).format("YYYY/MM/DD"),
      time_end: dayjs(task.time_end).format("YYYY/MM/DD"),
      status: task.status,
      note: task.note,
    };
    setDetailTask(updatedData);
    setDialogVisible(true);
    setIsNewTask(false);
  };
  const handleUpdateTask = useCallback(
    (task: ITaskModel) => {
      openDialogForUpdate(task);
    },
    [openDialogForUpdate]
  );

  const onHideDialog = useCallback(() => {
    setDialogVisible(false);
    setDetailTask({
      id: "",
      user_mail: "",
      project_id: "",
      time_start: "",
      time_end: "",
      status: 0,
      note: "",
    });
  }, []);

  return (
    <div className="client-board-column col-3 border-round ">
      <SortableContext
        id={id}
        items={tasks}
        strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef}>
          <div className="justify-content-between  mt-8 md:mt-0 ">
            <div className="h-full flex flex-column gap-3 mx-1 py-3">
              <div className="flex justify-content-between align-items-center   ">
                <span className="flex gap-2">
                  <span>{title}</span>
                  {tasks.length > 0 && <span> ({tasks.length})</span>}
                </span>
                {userLoginInfo.role === 1 && (
                  <Button
                    onClick={openDialogForCreate}
                    icon="pi pi-plus"
                    rounded
                    text
                    aria-label="Filter"
                    size="small"
                  />
                )}
              </div>
            </div>

            <div className="h-full flex flex-column gap-3 mx-1 pb-3 overflow-hidden max-h-30rem overflow-y-scroll overflow-x-hidden">
              {tasks.map((task) => (
                <TaskBoardItem
                  onClick={() => {
                    handleUpdateTask(task);
                  }}
                  task={task}
                  key={task.id}
                  id={task.id}
                />
              ))}
            </div>
          </div>
        </div>
      </SortableContext>

      <TaskBoardAddEditDialog
        detailTask={detailTask}
        isNewTask={isNewTask}
        dialogVisible={dialogVisible}
        onHide={onHideDialog}
      />
    </div>
  );
}
