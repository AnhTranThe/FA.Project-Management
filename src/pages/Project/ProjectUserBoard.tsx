import { Button } from "primereact/button";
import { useRef, useState } from "react";
import ClientAppSidebar from "../../components/Client/ClientAppSidebar";

export default function ProjectUserBoard() {
  const sidebarRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative flex justify-content-start align-items-start">
      <div
        className={`client-layout-sidebar h-screen z-3 ${
          isOpen ? "" : "hidden__navbarClient"
        }`}>
        <div className="client-layout-sidebar-content" ref={sidebarRef}>
          <ClientAppSidebar />
        </div>
      </div>

      <div className="relative right-content">
        <div className="absolute button__navClient">
          <Button
            onClick={toggleSidebar}
            icon={`z-3 pi ${isOpen ? "pi-angle-left" : "pi-angle-right"}`}
            className="p-button-rounded p-button-text p-mr-2 p-mt-2"
            aria-label="Toggle sidebar"></Button>
        </div>
        Content
      </div>
    </div>
  );
}
