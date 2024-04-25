/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITaskModel } from "../../models/taskModel";
import TaskBoardItem from "./TaskBoardItem";

export default function TaskBoardColumn({ title, tasks, onDrop }: { title: string, tasks: ITaskModel[], onDrop: any }) {
    return (
        <div className="task-column">
            <h2>{title}</h2>
            <div onDrop={onDrop} className="task-list">
                {tasks.map(task => <TaskBoardItem key={task.id} task={task} />)}
            </div>
        </div>
    )
}
