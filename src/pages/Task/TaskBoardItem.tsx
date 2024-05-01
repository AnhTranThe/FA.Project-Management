import { UniqueIdentifier } from "@dnd-kit/core";
import { ITaskModel } from "../../models/taskModel";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
        <div className="my-2" ref={setNodeRef} style={style} {...attributes} {...listeners} >
            <div className="w-full cursor-pointer border-round border-none client-board-column-item px-2 py-2">
                <p className="py-2">{task?.note}</p>
                <div className="flex align-items-center justify-content-between py-3">
                    <span className="pi pi-check-square  "></span>
                    <span className="pi pi-flag"></span>
                </div>
                <p className="text-xs">{task?.id}</p>
            </div>
        </div>
    );
}
