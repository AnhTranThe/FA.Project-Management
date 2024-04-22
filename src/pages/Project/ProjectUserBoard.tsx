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
        <div >
            <div className={`client-layout-sidebar h-full z-3 ${isOpen ? '' : 'hidden'}`}>
                <div ref={sidebarRef}>
                    <ClientAppSidebar />
                </div>
            </div>
            <Button
                onClick={toggleSidebar}
                icon={isOpen ? 'pi pi-times' : 'pi pi-bars'}
                className="p-button-rounded p-button-text p-mr-2 p-mt-2"
                aria-label="Toggle sidebar"
            />
        </div>


    )
}
