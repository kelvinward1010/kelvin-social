"use client"
import { Column, Id, Task } from "@/app/types";
import { AiOutlineDelete, AiOutlinePlusSquare } from "react-icons/ai";
import TaskCard from "./TaskCard";
import { useMemo, useState } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


interface Props {
    column: Column;
    deleteColumn: (id: Id) => void;
    updateColumn: (id: Id, title: string) => void;

    createTask: (columnId: Id) => void;
    updateTask: (id: Id, content: string) => void;
    deleteTask: (id: Id) => void;
    tasks: Task[];
}

function ColumnContainer({
    column,
    deleteColumn,
    createTask,
    updateColumn,
    updateTask,
    deleteTask,
    tasks
}: Props) {

    const tasksIds = useMemo(() => {
        return tasks.map((task) => task.id);
    }, [tasks]);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column,
        }
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    const columnTitleStyle = (title: string) => {
        const titleStyle = title === 'Todo' 
            ? 'text-red-600' 
            : (title === 'Improgress' 
                ? 'text-cyan-600' 
                : 'text-green-600')
        return titleStyle;
    }

    if(isDragging){
        return (
            <div className="
                    w-96
                    h-full
                    border-2
                    border-emerald-400
                    rounded-md
                    bg-gray-300
                "
                ref={setNodeRef}
                style={style}
            ></div>
        )
    }

    return(
        <div 
            ref={setNodeRef}
            style={style}
            className="
                w-96
                h-full
                border-2
                border-emerald-400
                rounded-md
                text-black
            "
        >
            <div
                {...attributes}
                {...listeners}
                className="
                    h-9
                    w-full
                    gap-1
                    flex
                    justify-between
                    items-center
                    pl-3
                    bg-white
                    rounded-t-md
                    cursor-pointer
                    pr-3
                "
            >
                <div className="w-50 flex justify-start gap-1 items-center">
                    <p className={`${columnTitleStyle(column?.title)} font-semibold text-lg`}>{column?.title}</p>
                    <span>(Task)({column?.contents?.length})</span>
                </div>
                <button 
                    className="text-lg hover:text-red-600"
                    onClick={() =>{
                        deleteColumn(column.id)
                    }}
                ><AiOutlineDelete /></button>
            </div>
            <div className="
                h-9
                w-full
                text-black
                border-4
                border-t-teal-600
                bg-white
                rounded-b-md
                flex
                justify-center
                items-center
            ">
                <button
                    onClick={() => createTask(column?.id)}
                    className="
                        text-md
                        flex
                        items-center
                        justify-content
                        gap-2
                        text-green-600
                    "
                >
                    <AiOutlinePlusSquare /> Add Task
                </button>
            </div>
            <div
                className="
                    h-full
                    overflow-y-auto
                    w-full
                "
            >
                <SortableContext items={tasksIds}>
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            deleteTask={deleteTask}
                            updateTask={updateTask}
                        />
                    ))}
                </SortableContext>
            </div>
        </div>
    )
}

export default ColumnContainer;