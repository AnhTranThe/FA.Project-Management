import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import { MenuItem } from "primereact/menuitem";
import { useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Link } from "react-router-dom";
import ClientAppSidebar from "../../components/Client/ClientAppSidebar";
import { useAppSelector } from "../../hooks/ReduxHook";
import { IProjectModel } from "../../models/projectModel";
import { ITaskModel } from "../../models/taskModel";
import { DONE_TASK_STATUS, IN_PROGRESS_TASK_STATUS, TO_DO_TASK_STATUS } from "../../store/type/actionType";
import TaskBoardColumn from "../Task/TaskBoardColumn";
import TaskUserSearch from "../Task/TaskUserSearch";
import ProjectListUsersJoin from "./ProjectListUsersJoin";


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
  const { listTaskByProjectId }: { listTaskByProjectId: ITaskModel[] } = useAppSelector((state) => state.taskReducer);
  const handleMoveTask = (id: string, status: string) => {
    console.log(id, status);
    // setTasks(tasks.map(task =  > task.id === id ? { ...task, status } : task));
  };

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
                <ProjectListUsersJoin projectId={selectedProject.id} />
              </div>``

            </section>
          </div>
          <div>
            <DndProvider backend={HTML5Backend}>
              <div className=" gap-3 grid mt-6 w-full">
                {listTaskByProjectId.length && <><TaskBoardColumn title="TO DO"
                  tasks={listTaskByProjectId.filter(task => {
                    return task.status === 1 && (searchKeyValue ? task.note.toLowerCase().includes(searchKeyValue.toLowerCase()) : true);
                  })}
                  onDrop={(taskId: string) => handleMoveTask(taskId, TO_DO_TASK_STATUS)} />

                  <TaskBoardColumn title="IN PROGRESS"
                    tasks={listTaskByProjectId.filter(task => {
                      return task.status === 2 && (searchKeyValue ? task.note.toLowerCase().includes(searchKeyValue.toLowerCase()) : true);
                    })}
                    onDrop={(taskId: string) => handleMoveTask(taskId, IN_PROGRESS_TASK_STATUS)} />
                  <TaskBoardColumn title="DONE"
                    tasks={listTaskByProjectId.filter(task => {
                      return task.status === 3 && (searchKeyValue ? task.note.toLowerCase().includes(searchKeyValue.toLowerCase()) : true);
                    })}
                    onDrop={(taskId: string) => handleMoveTask(taskId, DONE_TASK_STATUS)} /></>}
              </div>


            </DndProvider>

          </div>


        </div>

      </div>
      {/* <TaskBoardDialog isNewTask={true} dialogVisible={true} /> */}
    </div>
  );
}
