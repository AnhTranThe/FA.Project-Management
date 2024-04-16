import { Button } from "primereact/button";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { LayoutContext } from "../context/layoutcontext";

export default function ProjectUser() {
  const { layoutConfig } = useContext(LayoutContext);
  console.log(layoutConfig);
  return (
    <>
      {/* <div className={`p-6 ${layoutConfig.theme} ${layoutConfig.colorScheme}`}> */}
      <div className={`p-6`}>
        <h1 className="font-primary-black text-2xl font-bold">PROJECTS</h1>
        <div className="mt-8">
          <Link to="new" className="flex w-fit">
            <Button color="neutral" className="py-3 pl-3 pr-4">
              <span className="pi pi-plus"></span>
              <span className="pl-2">Add Project</span>
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
