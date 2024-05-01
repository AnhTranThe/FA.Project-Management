/* eslint-disable @typescript-eslint/no-explicit-any */
import { DndContext, DragOverlay, DragStartEvent, KeyboardSensor, MouseSensor, TouchSensor, UniqueIdentifier, useSensor, useSensors } from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import { MenuItem } from "primereact/menuitem";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ClientAppSidebar from "../../components/Client/ClientAppSidebar";
import { useAppSelector } from "../../hooks/ReduxHook";
import { IColumnTaskBoardModel } from '../../models/commonModel';
import { IProjectModel } from "../../models/projectModel";
import { ITaskModel } from '../../models/taskModel';
import TaskBoardColumn from "../Task/TaskBoardColumn";
import TaskBoardItem from "../Task/TaskBoardItem";
import TaskUserSearch from "../Task/TaskUserSearch";
import ProjectListUsersJoin from "./ProjectListUsersJoin";

const emptyColumnsBoard = [{
  id: "todo",
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
  id: "done",
  title: "DONE",
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
  console.log(listTasksByProject);


  const [columns, setColumns] = useState<IColumnTaskBoardModel[]>([]);
  const [isDraggingId, setIsDraggingId] = useState<UniqueIdentifier>('');

  const columnsBoard = [{
    id: "todo",
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
    id: "done",
    title: "DONE",
    status: 3,
    taskItems: listTasksByProject.length ? listTasksByProject?.filter(task => {
      return task.status === 3 && (searchKeyValue ? task.note.toLowerCase().includes(searchKeyValue.toLowerCase()) : true);
    }) : []
  }
  ];
  useEffect(() => {
    setColumns(columnsBoard);
  }, [listTasksByProject, searchKeyValue]);

  console.log(isDraggingId);


  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const findColumn = (id: string) => {
    for (const column of columns) {
      for (const taskItem of column.taskItems) {
        if (taskItem.id === id) {
          return column;
        }
      }
    }
    return null; // Return null if the taskItemId is not found in any column
  }

  const handleDragStart = (event: DragStartEvent) => {

    const { active } = event;
    const { id } = active;

    setIsDraggingId(id);
  }
  const handleDragOver = (event: any) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    console.log(over);


    const overId = over.id;
    if (activeId === overId) return;
    const activeData = active.data.current;
    const overData = over.data.current;
    console.log(activeData);
    console.log(overData);

    setColumns(prev => {

      const activeColumnData = active.data.current?.sortable.items

      const overColumnData = over.data.current?.sortable.items
      console.log(activeColumnData);
      console.log(overColumnData);


      // const overColumnData = prev[overData];


      console.log(activeId);

      // // Find the indexes for the items
      // const activeItemIndex = activeColumnData[0].taskItems.indexOf(activeId);
      // const overItemIndex = overColumnData[0].taskItems.indexOf(overId);




      // let newIndex;
      // if (overId in prev) {
      //   // We're at the root droppable of a Column
      //   newIndex = overColumnData.length + 1;
      // } else {
      //   const isBelowLastItem =
      //     over &&
      //     overItemIndex === overColumnData.length - 1 &&
      //     draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

      //   const modifier = isBelowLastItem ? 1 : 0;

      //   newIndex = overItemIndex >= 0 ? overItemIndex + modifier : overColumnData.length + 1;
      // }





      // Find the containers

      // const activeColumn = findColumn(id);
      // const overColumn = findColumn(overId);


      // const indexActiveColumn = activeColumn?.taskItems.findIndex((taskItem) => { return taskItem.id === id })
      // const indexOverColumn = overColumn?.taskItems.findIndex((taskItem) => { return taskItem.id === id })






    })
  }


  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeColumn = findColumn(id);
    const overConlumn = findColumn(overId);

    if (
      !activeColumn?.id ||
      !overConlumn?.id ||
      activeColumn.id !== overConlumn.id
    ) {
      return;
    }

    //   const activeIndex = items[activeContainer].indexOf(active.id);
    //   const overIndex = items[overContainer].indexOf(overId);


    //   if (activeIndex !== overIndex) {
    //     setItems((items) => ({
    //       ...items,
    //       [overContainer]: arrayMove(
    //         items[overContainer],
    //         activeIndex,
    //         overIndex
    //       ),
    //     }));
    //   }

    //   setActiveId(null);
    // }


    // // using dnd kit to handle drag and drop



    // const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
    // const [activeColumn, setActiveColumn] = useState<IColumnTaskBoardModel | null>(null);
    // const [activeTask, setActiveTask] = useState<ITaskModel | null>(null);


    // const onDragStart = (event: DragStartEvent) => {
    //   if (!hasDraggableData(event.active)) return;
    //   const data = event.active.data.current;
    //   if (data?.type === "Column") {
    //     setActiveColumn(data.column);
    //     return;
    //   }

    //   if (data?.type === "Task") {
    //     setActiveTask(data.task);
    //     return;
    //   }
  }


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
              onDragEnd={handleDragEnd}>
              <div className=" gap-3 flex overflow-x-auto mt-6 w-full">
                {columns.map((col) => (
                  <TaskBoardColumn
                    id={col.id}
                    key={col.id}
                    title={col.title}
                    column={col}
                    tasks={col.taskItems}
                    taskIds={col.taskItems.map(task => task.id)}
                  />
                ))}
                <DragOverlay>{isDraggingId ? <TaskBoardItem id={isDraggingId} /> : null}</DragOverlay>
              </div>


            </DndContext>

          </div>


        </div>

      </div>

    </div>
  );
}
