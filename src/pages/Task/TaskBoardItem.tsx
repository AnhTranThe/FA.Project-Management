import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useAppSelector } from "../../hooks/ReduxHook";
import { ITaskModel } from "../../models/taskModel";
import { IUserLogInInfoModel } from "../../models/userModel";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TaskBoardItem({ task, id, onClick }: { task?: ITaskModel, id: UniqueIdentifier, onClick?: React.Dispatch<React.SetStateAction<boolean>> | undefined }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };
    const { userLoginInfo }: { userLoginInfo: IUserLogInInfoModel } = useAppSelector((state) => state.userReducer);

    return (
        <div className="my-2" ref={setNodeRef} style={style} {...attributes} >
            <div onClick={() => onClick && onClick(true)} className="w-full cursor-pointer border-round border-none client-board-column-item px-2 py-2 hover:bg-primary-reverse">
                <div className="flex justify-content-between">
                    <p className="py-2 text-xl">{task?.note}</p>
                    {/* <Button {...listeners} icon="pi pi-arrows-alt" rounded size="small" /> */}
                    {
                        userLoginInfo.role !== 1 && (<a  {...listeners} className="pi pi-arrows-alt">
                        </a>)
                    }
                </div>

                <div className="flex align-items-center justify-content-between py-3">
                    <span className="pi pi-check-square  "></span>
                    <span className="pi pi-flag"></span>
                </div>
                <p className="text-xs">{task?.id}</p>
            </div>
        </div>
    );
}
