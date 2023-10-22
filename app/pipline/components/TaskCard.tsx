"use client"
import { Id, Task } from "@/app/types";
import { useSortable } from "@dnd-kit/sortable";
import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";


interface Props {
    task: Task;
    deleteTask?: (id: Id) => void;
    updateTask?: (id: Id, content: string) => void;
}

function TaskCard({ task, deleteTask, updateTask }: Props) {

    const [mouseIsOver, setMouseIsOver] = useState(false);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task,
        },
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    if(isDragging) {
        return(
            <div
                ref={setNodeRef}
                style={style}
                className="
                    h-12
                    w-full
                    border-1
                    border-emerald-400
                    my-1
                    bg-white
                    rounded-md
                    flex
                    justify-content
                    items-center
                    px-1
                    opacity-30
                "
            />
        )
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="
                h-12
                w-full
                border-1
                border-emerald-400
                my-1
                bg-white
                rounded-md
                flex
                justify-content
                items-center
                px-1
                cursor-grab 
                relative
            "
        >
            {task?.content}
        </div>
    )
}

export default TaskCard;