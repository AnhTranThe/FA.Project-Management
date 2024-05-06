import { UniqueIdentifier } from "@dnd-kit/core";
import { ITaskModel } from "../../models/taskModel";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "primereact/button";

export default function TaskBoardItem({ task, id }: { task?: ITaskModel, id: UniqueIdentifier }) {
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

    return (
        <div className="my-2" ref={setNodeRef} style={style} {...attributes} >
            <div className="w-full cursor-pointer border-round border-none client-board-column-item px-2 py-2">
                <div className="flex justify-content-between">
                    <p className="py-2 text-xl">{task?.note}</p>
                    {/* <Button {...listeners} icon="pi pi-arrows-alt" rounded size="small" /> */}
                    <a {...listeners} className="pi pi-arrows-alt">

                    </a>
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
