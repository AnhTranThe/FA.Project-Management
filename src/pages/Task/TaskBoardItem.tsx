import { ITaskModel } from "../../models/taskModel";

export default function TaskBoardItem({ task }: { task: ITaskModel }) {
    return (
        <div >
            {task.note}
        </div>
    );
}
