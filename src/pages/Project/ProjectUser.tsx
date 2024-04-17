import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/ReduxHook";
import { useAppDispatch } from "../../store/store";

import { useEffect, useState } from "react";
import { IProjectModel } from "../../models/projectModel";
import { getProjectByUserService } from "../../Services/projectServiceApi";
import { formatDateTime } from "../../utils/Utilities";

export default function ProjectUser() {
  const dispatch = useAppDispatch();
  const { data }: { data: IProjectModel[] } = useAppSelector((state) => state.projectReducer);
  const { loginUserEmail }: { loginUserEmail: string } = useAppSelector((state) => state.userReducer);
  const [projectByUserLs, setProjectByUserLs] = useState<IProjectModel[]>([]);
  const handleReloadData = async () => {
    const result = await getProjectByUserService(loginUserEmail);
    setProjectByUserLs(result)
  }
  console.log(projectByUserLs);

  useEffect(() => { handleReloadData() }, [])
  return <>
    <div className="p-6">
      <h1 className="font-primary-black text-2xl font-bold">PROJECTS</h1>
      <div className="mt-5">
        <Link to="new" className="flex w-fit">
          <Button color="neutral" className="py-3 pl-3 pr-4">
            <span className="pi pi-plus"></span>
            <span className="pl-2">Add Project</span>
          </Button>
        </Link>
      </div>

      <div id="features" className="py-4 px-4 lg:px-8 mt-5 mx-0 lg:mx-8">
        <div className="grid justify-content-center">
          {
            projectByUserLs.map((project) => (
              <div key={project.id} className="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 lg:pb-5 mt-4 lg:mt-0 cursor-pointer">
                <div
                  style={{

                    padding: '2px',
                    borderRadius: '10px',
                    background: 'linear-gradient(90deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2))'
                  }}
                >
                  <div className="p-3 surface-card h-full" style={{ borderRadius: '8px' }}>
                    <div className="flex justify-content-between">
                      <div
                        className="flex align-items-center justify-content-center bg-yellow-200 mb-3"
                        style={{
                          width: '3.5rem',
                          height: '3.5rem',
                          borderRadius: '10px'
                        }}
                      >
                        <i className="pi pi-fw pi-users text-2xl text-yellow-700"></i>

                      </div>

                      <Button icon="pi pi-times" rounded severity="danger" aria-label="Cancel" />
                    </div>

                    <h5 className="mb-2 text-900">{project.name}</h5>
                    <span className="text-600">{formatDateTime(project.time_start)}</span>
                  </div>
                </div>
              </div>

            ))

          }



        </div>

      </div>


    </div>
  </>;
}
