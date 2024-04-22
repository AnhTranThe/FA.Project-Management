import { Image } from "primereact/image";
import { useAppSelector } from "../../hooks/ReduxHook";
import { IModel } from "../../models/commonModel";
import { IProjectModel } from "../../models/projectModel";
import { MenuProvider } from "../../pages/context/menucontext";
import allClientNavigations from "../Navigation/allClientNavigations";
import ClientAppMenuItem from "./ClientAppMenuItem";

export default function ClientAppMenu() {
    const { selectedProject }: { selectedProject: IProjectModel } = useAppSelector((state) => state.projectReducer);
    const model: IModel[] = [...allClientNavigations(selectedProject.id)];


    return (
        <>
            <section className="flex justify-content-center align-items-center w-full align-items-start py-6">
                <Image src="https://admin.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10400?size=xxlarge" alt="Image" width="50" />
                <div className="ml-4 w-full text-font"><p className="font-bold text-lg line-height-1 flex-nowrap ">{selectedProject.name}</p>
                    <p className="mt-2 line-clamp-2 whitespace-normal font-primary-light text-sm line-height-1">Software project</p>
                </div>


            </section>
            <MenuProvider>
                <ul className="layout-menu">
                    {model.map((item, i) => {
                        return !item.separator ? <ClientAppMenuItem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                    })}
                </ul>
            </MenuProvider>

        </>

    );
}
