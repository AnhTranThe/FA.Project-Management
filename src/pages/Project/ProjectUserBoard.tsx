/* eslint-disable @typescript-eslint/no-explicit-any */

import { closestCorners, DndContext, DragOverEvent, DragOverlay, DragStartEvent, KeyboardSensor, MouseSensor, TouchSensor, UniqueIdentifier, useSensor, useSensors } from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import { MenuItem } from "primereact/menuitem";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ClientAppSidebar from "../../components/Client/ClientAppSidebar";
import { useAppSelector } from "../../hooks/ReduxHook";

import { IColumnData, IColumnTaskBoardModel } from '../../models/dndModel';
import { IProjectModel } from "../../models/projectModel";
import { ITaskModel } from '../../models/taskModel';


import { updateTaskService } from "../../Services/taskServiceApi";
import { getTasksByProject } from '../../store/action/taskAction';
import { useAppDispatch } from "../../store/store";
import TaskBoardColumn from "../Task/TaskBoardColumn";
import TaskBoardItem from "../Task/TaskBoardItem";
import TaskUserSearch from "../Task/TaskUserSearch";
import ProjectListUsersJoin from "./ProjectListUsersJoin";

const emptyColumnsBoard = [{
  id: "to-do",
  title: "TO DO",
  status: 1,
  taskItems: []
},
{
  id: "in-progress",
  title: "IN PROGRESS",
  status: 2,
  taskItems: []
},
{
  id: "is-done",
  title: "IS DONE",
  status: 3,
  taskItems: []
}
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
    setSearchKeyValue(searchKeyValue)
  };
  const { selectedProject }: { selectedProject: IProjectModel } = useAppSelector((state) => state.projectReducer);
  const { listTasksByProject }: { listTasksByProject: ITaskModel[] } = useAppSelector((state) => state.taskReducer);
  console.log("initial", listTasksByProject);


  const [columns, setColumns] = useState<IColumnTaskBoardModel[]>([]);
  const [updatedColumns, setUpdatedColumns] = useState<IColumnTaskBoardModel[]>([]);
  const [columnsData, setColumnsData] = useState<IColumnData[]>([]);
  const dispatch = useAppDispatch();
  const [isDraggingId, setIsDraggingId] = useState<UniqueIdentifier | null>(null);
  // console.log("columns", columns);
  // console.log("columnsData", columnsData);



  const columnsBoard = [{
    id: "to-do",
    title: "TO DO",
    status: 1,
    taskItems: listTasksByProject.length ? listTasksByProject?.filter(task => {
      return task.status === 1 && (searchKeyValue ? task.note.toLowerCase().includes(searchKeyValue.toLowerCase()) : true);
    }) : []
  },
  {
    id: "in-progress",
    title: "IN PROGRESS",
    status: 2,
    taskItems: listTasksByProject.length ? listTasksByProject?.filter(task => {
      return task.status === 2 && (searchKeyValue ? task.note.toLowerCase().includes(searchKeyValue.toLowerCase()) : true);
    }) : []
  },
  {
    id: "is-done",
    title: "DONE",
    status: 3,
    taskItems: listTasksByProject.length ? listTasksByProject?.filter(task => {
      return task.status === 3 && (searchKeyValue ? task.note.toLowerCase().includes(searchKeyValue.toLowerCase()) : true);
    }) : []
  }
  ];

  useEffect(() => {
    setColumns(columnsBoard);
    //   id: column.id,
    //   taskItems: column.taskItems
    // }));
    const simplifiedColumnsData: IColumnData[] = columnsBoard.map(column => ({
      [column.id]: column.taskItems
    }));
    setColumnsData(simplifiedColumnsData);
  }, [listTasksByProject, searchKeyValue]);


  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const findBoardColumn = (columnsData: any[], id: string): string | undefined => {
    for (const columnData of columnsData) {
      for (const columnKey in columnData) {
        if (columnData[columnKey].find((item: { id: string }) => item.id === id)) {
          return columnKey;
        }
      }
    }
    return undefined;
  }

  const getColumnItems = (data: any[], column: string) => {
    for (const item of data) {
      if (Object.prototype.hasOwnProperty.call(item, column)) {
        return item[column];
      }
    }
    return []; // Return an empty array if column is not found
  }


  const handleDragStart = useCallback(({ active }: DragStartEvent) => {

    setIsDraggingId(active.id);
  }, [columnsData])
  const handleDragOver = ({ active, over }: DragOverEvent) => {
    console.log("active", active);
    console.log("over", over);

    // Find the column
    const activeColumn = findBoardColumn(
      columnsData,
      active.id as string
    );
    const overColumn = findBoardColumn(
      columnsData,
      over?.id as string
    );
    // console.log("activeColumn", activeColumn);
    // console.log("overColumn", overColumn);

    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      return;
    }
    const activeItems = getColumnItems(columnsData, activeColumn);
    const overItems = getColumnItems(columnsData, overColumn);

    // console.log("activeItems", activeItems);
    // console.log("overItems", overItems);

    if (overItems.length == 0) {
      console.log("0");


    }
    const activeIndex = activeItems.findIndex((item: { id: UniqueIdentifier; }) => item.id === active.id);
    const overIndex = overItems?.findIndex((item: { id: UniqueIdentifier; }) => item.id === over?.id);



    setColumns((prevColumns) => {
      // let newIndex;
      // if (over?.id && over?.id in prevColumns) {
      //   newIndex = overItems.length + 1

      // }
      // else{
      //   const isBelowLastItem =
      //     over &&
      //     overIndex === overItems.length - 1 &&
      //     draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

      //   const modifier = isBelowLastItem ? 1 : 0;

      //   newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      // }

      const updatedColumns = prevColumns.map((col) => {
        if (col.id === activeColumn) {

          const updateActiveCol = {
            ...col,
            taskItems: activeItems.filter(
              (item: { id: UniqueIdentifier }) => item.id !== active.id
            )
          }
          console.log("updateActiveCol", updateActiveCol);

          return updateActiveCol
        }
        if (col.id === overColumn) {
          const updateOverCol = {
            ...col,
            taskItems: [
              ...overItems.slice(0, overIndex),
              activeItems[activeIndex],
              ...overItems.slice(overIndex)
            ]
          }
          console.log("updateOverCol", updateOverCol);
          return updateOverCol
        }
        console.log("othetCol", col);
        return col;
      }


      );
      console.log("updatedColumns", updatedColumns);



      setUpdatedColumns(updatedColumns);
      return updatedColumns;

    });





  };


  const handleDragEnd = async () => {




    const shadowCopyUpdatedColumns = updatedColumns.map(column => ({
      ...column,
      taskItems: column.taskItems.map(item => ({ ...item })) // Ensure taskItems are also copied immutably
    }));

    shadowCopyUpdatedColumns.forEach(column => {
      if (column.id === "to-do") {
        column.status = 1;
        column.taskItems.forEach(col => {
          col.status = 1;
        });
      }
      if (column.id === "in-progress") {
        column.status = 2;
        column.taskItems.forEach(col => {
          col.status = 2;
        });
      }
      if (column.id === "is-done") {
        column.status = 3;
        column.taskItems.forEach(col => {
          col.status = 3;
        });
      }
    });
    // const newMapUpdatedColumns = updatedColumns.map((col) => {
    //   return col.taskItems
    // }).reduce((acc, val) => acc.concat(val), []);


    const newMapUpdatedColumns = shadowCopyUpdatedColumns.flatMap(col => col.taskItems);

    const updateTaskItem = newMapUpdatedColumns.find(col => col.id === isDraggingId);

    // console.log("newMapUpdatedColumns", newMapUpdatedColumns);
    // console.log("updateTaskItem", updateTaskItem);


    //  updateTaskItem && dispatch(updateTasksByProject(updateTaskItem))
    const res = updateTaskItem && await updateTaskService(updateTaskItem);
    if (res && res.code === 200) {
      if (selectedProject.id) {
        dispatch(getTasksByProject(selectedProject.id));
      }
    }
  }


  // Function called when a drag operation is cancelled
  const handleDragCancel = useCallback(() => {
    const simplifiedColumnsData: IColumnData[] = columnsBoard.map(column => ({
      [column.id]: column.taskItems
    }));
    setColumnsData(simplifiedColumnsData);
    setIsDraggingId(null);
  }, []);
  const BreadCumbItems: MenuItem[] = [
    {
      template: () => {
        return (
          <Link className="text-primary font-semibold" to={`/client/projects/${selectedProject.id}/board`}>{selectedProject.name}</Link>
        );
      },
    },
  ]
  const breadCumbHome = { icon: 'pi pi-home', url: '/client/projects' };

  return (
    <div className="relative flex justify-content-start align-items-start ">
      <div
        className={`col-3 client-layout-sidebar h-screen z-3 overflow-x-hidden ${isOpen ? "" : "hidden__navbarClient"
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
        <div className="w-full" >
          <section className="pt-6 ">
            <BreadCrumb className="border-none" style={{ backgroundColor: 'transparent' }} model={BreadCumbItems} home={breadCumbHome} />
            <h1 className="text-2xl">Board
            </h1>
          </section>

          <div style={{ boxSizing: 'border-box' }} className="flex h-full">
            <section className="flex align-items-center gap-3">
              <div>
                <TaskUserSearch onSearchChange={handleSearchChange} />
              </div>
              <div>
                <ProjectListUsersJoin />
              </div>``

            </section>
          </div>
          <div>
            <DndContext
              sensors={sensors}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
              collisionDetection={closestCorners}
            // onDragCancel={handleDragCancel}
            >

              <div className=" gap-3 flex overflow-x-auto mt-6 w-full">
                {columns.map((col) => (
                  <TaskBoardColumn
                    id={col.id}
                    key={col.id}
                    title={col.title}
                    tasks={col.taskItems}

                  />
                ))}
                <DragOverlay>{isDraggingId ? <TaskBoardItem id={String(isDraggingId)} /> : null}</DragOverlay>
              </div>


            </DndContext>

          </div>


        </div>

      </div>

    </div>
  );
}




