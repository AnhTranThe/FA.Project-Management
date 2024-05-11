/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  closestCorners,
  DndContext,
  DragMoveEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import { MenuItem } from "primereact/menuitem";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ClientAppSidebar from "../../components/Client/ClientAppSidebar";
import { useAppSelector } from "../../hooks/ReduxHook";

import { IColumnData, IColumnTaskBoardModel } from "../../models/dndModel";
import { IProjectModel } from "../../models/projectModel";
import { ITaskModel } from "../../models/taskModel";

import { updateTaskService } from "../../Services/taskServiceApi";
import { getTasksByProject } from "../../store/action/taskAction";
import { useAppDispatch } from "../../store/store";
import TaskBoardColumn from "../Task/TaskBoardColumn";
import TaskBoardItem from "../Task/TaskBoardItem";
import TaskUserSearch from "../Task/TaskUserSearch";
import ProjectListUsersJoin from "./ProjectListUsersJoin";
import { IUserLogInInfoModel } from "../../models/userModel";

const emptyColumnsBoard = [
  {
    id: "to-do",
    title: "TO DO",
    status: 1,
    taskItems: [],
  },
  {
    id: "in-progress",
    title: "IN PROGRESS",
    status: 2,
    taskItems: [],
  },
  {
    id: "is-done",
    title: "IS DONE",
    status: 3,
    taskItems: [],
  },
] satisfies IColumnTaskBoardModel[];

export type ColumnId = (typeof emptyColumnsBoard)[number]["id"];

export default function ProjectUserBoard() {
  const sidebarRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);
  const [searchKeyValue, setSearchKeyValue] = useState<string>("");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const handleSearchChange = (searchKeyValue: string) => {
    setSearchKeyValue(searchKeyValue);
  };
  const { selectedProject }: { selectedProject: IProjectModel } =
    useAppSelector((state) => state.projectReducer);
  const { userLoginInfo }: { userLoginInfo: IUserLogInInfoModel } =
    useAppSelector((state) => state.userReducer);
  const { listTasksByProject }: { listTasksByProject: ITaskModel[] } =
    useAppSelector((state) => state.taskReducer);

  const [columns, setColumns] = useState<IColumnTaskBoardModel[]>([]);
  const [updatedColumns, setUpdatedColumns] = useState<IColumnTaskBoardModel[]>(
    []
  );
  const [columnsData, setColumnsData] = useState<IColumnData[]>([]);
  const dispatch = useAppDispatch();
  const [DraggingId, setDraggingId] = useState<UniqueIdentifier | null>(null);
  const [DragingTask, setDragingTask] = useState<ITaskModel | undefined>(
    undefined
  );

  const columnsBoard = [
    {
      id: "to-do",
      title: "TO DO",
      status: 1,
      taskItems:
        userLoginInfo.role === 1
          ? listTasksByProject.length
            ? listTasksByProject?.filter((task) => {
                return (
                  task.status === 1 &&
                  (searchKeyValue
                    ? task.note
                        .toLowerCase()
                        .includes(searchKeyValue.toLowerCase())
                    : true)
                );
              })
            : []
          : listTasksByProject.length
          ? listTasksByProject?.filter((task) => {
              return (
                task.status === 1 &&
                task.user_mail === userLoginInfo.email &&
                (searchKeyValue
                  ? task.note
                      .toLowerCase()
                      .includes(searchKeyValue.toLowerCase())
                  : true)
              );
            })
          : [],
    },
    {
      id: "in-progress",
      title: "IN PROGRESS",
      status: 2,
      taskItems:
        userLoginInfo.role === 1
          ? listTasksByProject.length
            ? listTasksByProject?.filter((task) => {
                return (
                  task.status === 2 &&
                  (searchKeyValue
                    ? task.note
                        .toLowerCase()
                        .includes(searchKeyValue.toLowerCase())
                    : true)
                );
              })
            : []
          : listTasksByProject.length
          ? listTasksByProject?.filter((task) => {
              return (
                task.status === 2 &&
                task.user_mail === userLoginInfo.email &&
                (searchKeyValue
                  ? task.note
                      .toLowerCase()
                      .includes(searchKeyValue.toLowerCase())
                  : true)
              );
            })
          : [],
    },
    {
      id: "is-done",
      title: "DONE",
      status: 3,
      taskItems:
        userLoginInfo.role === 1
          ? listTasksByProject.length
            ? listTasksByProject?.filter((task) => {
                return (
                  task.status === 3 &&
                  (searchKeyValue
                    ? task.note
                        .toLowerCase()
                        .includes(searchKeyValue.toLowerCase())
                    : true)
                );
              })
            : []
          : listTasksByProject.length
          ? listTasksByProject?.filter((task) => {
              return (
                task.status === 3 &&
                task.user_mail === userLoginInfo.email &&
                (searchKeyValue
                  ? task.note
                      .toLowerCase()
                      .includes(searchKeyValue.toLowerCase())
                  : true)
              );
            })
          : [],
    },
  ];

  useEffect(() => {
    setColumns(columnsBoard);

    const simplifiedColumnsData: IColumnData[] = columnsBoard.map((column) => ({
      [column.id]: column.taskItems,
    }));

    setColumnsData(simplifiedColumnsData);
  }, [listTasksByProject, searchKeyValue]);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findBoardColumn = (
    columnsData: IColumnData[],
    id: string
  ): string | undefined => {
    for (const columnData of columnsData) {
      // Check if the column ID matches
      if (Object.keys(columnData).includes(id)) {
        return id;
      }
      for (const columnKey in columnData) {
        if (columnKey !== id) {
          // Skip checking if the property is 'id'
          if (
            columnData[columnKey].find((item: { id: string }) => item.id === id)
          ) {
            return columnKey;
          }
        }
      }
    }
    return undefined;
  };

  const getColumnItems = (data: any[], column: string) => {
    for (const item of data) {
      if (Object.prototype.hasOwnProperty.call(item, column)) {
        return item[column];
      }
    }
    return []; // Return an empty array if column is not found
  };

  const handleDragStart = useCallback(
    ({ active }: DragStartEvent) => {
      setDraggingId(active.id);
      const selectedTask = listTasksByProject.find(
        (task) => task.id === active.id
      );
      setDragingTask(selectedTask);
    },
    [columnsData]
  );

  const handleDragMove = (event: DragMoveEvent) => {
    const { active, over } = event;

    // Handle Items Sorting
    if (active && over && active.id !== over.id) {
      // Find the active container and over container

      const activeColumn = findBoardColumn(columnsData, active.id as string);
      const overColumn = findBoardColumn(columnsData, over?.id as string);

      // If the active or over container is not found, return
      if (!activeColumn || !overColumn) return;

      // Find the items of the active and over container
      const activeItems = getColumnItems(columnsData, activeColumn);

      const overItems = getColumnItems(columnsData, overColumn);

      // Find the index of the active and over container
      const activeIndex = activeItems.findIndex(
        (item: { id: UniqueIdentifier }) => item.id === active.id
      );
      const overIndex = overItems.findIndex(
        (item: { id: UniqueIdentifier }) => item.id === over.id
      );

      if (activeColumn === overColumn) {
        const updatedColumns = columns.map((col) => {
          if (col.id === activeColumn) {
            // Copy the active column and update its task items array
            return {
              ...col,
              taskItems: arrayMove(col.taskItems, activeIndex, overIndex),
            };
          }
          // For other columns, return them as they are
          return col;
        });

        // Update the state with the new columns array
        setColumns(updatedColumns);
      } else {
        // In different containers
        const updatedActiveItems = [...activeItems];
        const updatedOverItems = [...overItems];
        // Remove the item from the active container
        const [removedItem] = updatedActiveItems.splice(activeIndex, 1);
        // Add the removed item to the over container
        updatedOverItems.splice(overIndex, 0, removedItem);

        // Update the state with the modified items in both containers
        setColumns((prevColumns) => {
          const updatedColumns = prevColumns.map((col) => {
            if (col.id === activeColumn) {
              return {
                ...col,
                taskItems: updatedActiveItems,
              };
            } else if (col.id === overColumn) {
              return {
                ...col,
                taskItems: updatedOverItems,
              };
            }
            return col;
          });
          setUpdatedColumns(updatedColumns);
          return updatedColumns;
        });
      }
    }
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    // Find the column
    const activeColumn = findBoardColumn(columnsData, active.id as string);
    const overColumn = findBoardColumn(columnsData, over?.id as string);

    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      return;
    }
    const activeItems = getColumnItems(columnsData, activeColumn);
    const overItems = getColumnItems(columnsData, overColumn);
    const activeIndex = activeItems.findIndex(
      (item: { id: UniqueIdentifier }) => item.id === active.id
    );

    // Calculate the index where the dragged item will be inserted
    let newIndex = 0;
    if (overItems.length > 0) {
      const overIndex = overItems.findIndex(
        (item: { id: UniqueIdentifier }) => item.id === over?.id
      );
      if (overIndex > -1) {
        newIndex = overIndex;
      }
    }

    setColumns((prevColumns) => {
      const updatedColumns = prevColumns.map((col) => {
        if (col.id === activeColumn) {
          const updateActiveCol = {
            ...col,
            taskItems: activeItems.filter(
              (item: { id: UniqueIdentifier }) => item.id !== active.id
            ),
          };

          return updateActiveCol;
        }
        if (col.id === overColumn) {
          const updateOverCol = {
            ...col,
            taskItems: [
              ...overItems.slice(0, newIndex),
              activeItems[activeIndex],
              ...overItems.slice(newIndex),
            ],
          };

          return updateOverCol;
        }

        return col;
      });
      setUpdatedColumns(updatedColumns);
      return updatedColumns;
    });
  };

  const handleDragEnd = async () => {
    const shadowCopyUpdatedColumns = updatedColumns.map((column) => ({
      ...column,
      taskItems: column.taskItems.map((item) => ({ ...item })), // Ensure taskItems are also copied immutably
    }));

    shadowCopyUpdatedColumns.forEach((column) => {
      if (column.id === "to-do") {
        column.status = 1;
        column.taskItems.forEach((col) => {
          col.status = 1;
        });
      }
      if (column.id === "in-progress") {
        column.status = 2;
        column.taskItems.forEach((col) => {
          col.status = 2;
        });
      }
      if (column.id === "is-done") {
        column.status = 3;
        column.taskItems.forEach((col) => {
          col.status = 3;
        });
      }
    });
    // const updateTaskItem = newActiveItems.find(col => col.id === DraggingId);

    const newMapUpdatedColumns = shadowCopyUpdatedColumns.flatMap(
      (col) => col.taskItems
    );

    const updateTaskItem = newMapUpdatedColumns.find(
      (col) => col.id === DraggingId
    );

    const res = updateTaskItem && (await updateTaskService(updateTaskItem));
    if (res && res.code === 200) {
      if (selectedProject.id) {
        dispatch(getTasksByProject(selectedProject.id));
      }
    }
    setDraggingId(null);
    setDragingTask(undefined);
  };

  const BreadCumbItems: MenuItem[] = [
    {
      template: () => {
        return (
          <Link
            className="text-primary font-semibold"
            to={`/client/projects/${selectedProject.id}/board`}>
            {selectedProject.name}
          </Link>
        );
      },
    },
  ];
  const breadCumbHome = { icon: "pi pi-home", url: "/client/projects" };

  return (
    <div className="relative flex justify-content-start align-items-start ">
      <div
        className={`col-3 client-layout-sidebar h-screen z-3 overflow-x-hidden ${
          isOpen ? "" : "hidden__navbarClient"
        }`}>
        <div className="client-layout-sidebar-content " ref={sidebarRef}>
          <ClientAppSidebar />
        </div>
      </div>

      <div className="col-9 relative right-content ">
        <div className="absolute button__navClient">
          <Button
            onClick={toggleSidebar}
            icon={`z-3 pi ${isOpen ? "pi-angle-left" : "pi-angle-right"}`}
            className="p-button-rounded p-button-text p-mr-2 p-mt-2"
            aria-label="Toggle sidebar"></Button>
        </div>
        <div className="w-full">
          <section className="pt-6 ">
            <BreadCrumb
              className="border-none"
              style={{ backgroundColor: "transparent" }}
              model={BreadCumbItems}
              home={breadCumbHome}
            />
            <h1 className="text-2xl">Board</h1>
          </section>

          <div style={{ boxSizing: "border-box" }} className="flex h-full">
            <section className="flex align-items-center gap-3">
              <div>
                <TaskUserSearch onSearchChange={handleSearchChange} />
              </div>
              <div>
                <ProjectListUsersJoin />
              </div>
            </section>
          </div>
          <div>
            <DndContext
              sensors={sensors}
              onDragStart={handleDragStart}
              onDragMove={handleDragMove}
              //onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
              collisionDetection={closestCorners}>
              <div className=" gap-3 flex overflow-x-auto mt-6 w-full">
                {columns.map((col) => (
                  <TaskBoardColumn
                    id={col.id}
                    key={col.id}
                    title={col.title}
                    tasks={col.taskItems}
                  />
                ))}
                <DragOverlay>
                  {DraggingId ? (
                    <TaskBoardItem task={DragingTask} id={String(DraggingId)} />
                  ) : null}
                </DragOverlay>
              </div>
            </DndContext>
          </div>
        </div>
      </div>
    </div>
  );
}
