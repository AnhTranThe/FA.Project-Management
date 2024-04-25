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
import TaskBoardColumn from "../Task/TaskBoardColumn";
import TaskUserSearch from "../Task/TaskUserSearch";
import ProjectListUsersJoin from "./ProjectListUsersJoin";

export default function ProjectUserBoard() {
  const sidebarRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const { selectedProject }: { selectedProject: IProjectModel } = useAppSelector((state) => state.projectReducer);
  const { ListTasksInProjectUser }: { selectedProject: IProjectModel } = useAppSelector((state) => state.projectReducer);



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
        className={`col-3 client-layout-sidebar h-screen z-3 ${isOpen ? "" : "hidden__navbarClient"
          }`}>
        <div className="client-layout-sidebar-content" ref={sidebarRef}>
          <ClientAppSidebar />
        </div>
      </div>

      <div className="col-8 relative right-content ">
        <div className="absolute button__navClient">
          <Button
            onClick={toggleSidebar}
            icon={`z-3 pi ${isOpen ? "pi-angle-left" : "pi-angle-right"}`}
            className="p-button-rounded p-button-text p-mr-2 p-mt-2"
            aria-label="Toggle sidebar"></Button>
        </div>
        <div className="" >
          <section className="pt-6 ">
            <BreadCrumb className="border-none" style={{ backgroundColor: 'transparent' }} model={BreadCumbItems} home={breadCumbHome} />
            <h1 className="text-2xl">Board
            </h1>
          </section>

          <div style={{ boxSizing: 'border-box' }} className="flex h-full">
            <section className="flex align-items-center gap-3">
              <div>
                <TaskUserSearch />
              </div>
              <div>
                <ProjectListUsersJoin />
              </div>
              <DndProvider backend={HTML5Backend}>
                <div className="task-board">
                  {/* <TaskBoardColumn title="TO DO" tasks={tasks.filter(task => task.status === 'TO_DO')} onDrop={() => moveTask(task.id, 'TO_DO')} /> */}

                </div>

                {/* <div className="task-board">
                  <TaskColumn title="TO DO" tasks={tasks.filter(task => task.status === 'TO_DO')} onDrop={() => moveTask(task.id, 'TO_DO')} />
                  <TaskColumn title="IN PROGRESS" tasks={tasks.filter(task => task.status === 'IN_PROGRESS')} onDrop={() => moveTask(task.id, 'IN_PROGRESS')} />
                  <TaskColumn title="DONE" tasks={tasks.filter(task => task.status === 'DONE')} onDrop={() => moveTask(task.id, 'DONE')} />
                </div> */}
              </DndProvider>
            </section>
          </div>
          <div>


          </div>


        </div>

      </div>
    </div>
  );
}
