/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "primereact/button";
import { ITaskModel } from "../../models/taskModel";
import { useState } from "react";

export default function TaskBoardColumn({ title, tasks, onDrop }: { title: string, tasks: ITaskModel[], onDrop: any }) {
    const [isDrag, setIsDrag] = useState<boolean>(false);

    console.log(onDrop);

    return (
        <div className="client-board-column col-3 border-round ">
            <div className="justify-content-between  mt-8 md:mt-0 ">

                <div className="h-full flex flex-column gap-3 mx-1 pb-3">
                    <div className="flex justify-content-between align-items-center   ">
                        <span className="flex gap-2">
                            <span>{title}</span>
                            {tasks.length > 0 && <span> ({tasks.length})</span>}
                        </span>


                        <Button icon="pi pi-plus" rounded text aria-label="Filter" size="small" />
                    </div>

                </div>

                <div className="h-full flex flex-column gap-3 mx-1 pb-3 overflow-hidden max-h-30rem overflow-y-scroll overflow-x-hidden">
                    {tasks.map((task, index) => (
                        <div key={index} className="w-full cursor-pointer border-round border-none client-board-column-item px-2 py-2">
                            <p className="py-2">{task.note}</p>
                            <div className="flex align-items-center justify-content-between py-3">
                                <span className="pi pi-check-square  "></span>
                                <span className="pi pi-flag"></span>
                            </div>
                            <p className="text-xs">{task.id}</p>
                        </div>
                    ))}
                </div>



            </div>


        </div>




    )
}
