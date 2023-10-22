"use client"
import { Column, Id, Task } from "@/app/types";
import { useMemo, useState } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import ColumnContainer from "./ColumnContainer";
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";


function generateId() {
    return Math.floor(Math.random() * 10001)
}

const initialColumn = [
    {
        id: 1,
        title: 'Todo',
        contents: []
    },
    {
        id: 2,
        title: 'Improgress',
        contents: []
    },
    {
        id: 3,
        title: 'Done',
        contents: []
    },
]

function Board() {

    const [columns, setColumns] = useState<Column[]>(initialColumn);
    const [tasks, setTasks] = useState<Task[]>([]);

    const [activeColumn, setActiveColumn] = useState<Column | null>(null);
    const [activeTask, setActiveTask] = useState<Task | null>(null);

    const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === "Column") {
            setActiveColumn(event.active.data.current.column);
            return;
        }

        if (event.active.data.current?.type === "Task") {
            setActiveTask(event.active.data.current.task);
            return;
        }
    }

    function onDragEnd(event: DragEndEvent) {
        setActiveColumn(null);
        setActiveTask(null);

        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveAColumn = active.data.current?.type === "Column";
        if (!isActiveAColumn) return;

        console.log("DRAG END");

        setColumns((columns) => {
            const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

            const overColumnIndex = columns.findIndex((col) => col.id === overId);

            return arrayMove(columns, activeColumnIndex, overColumnIndex);
        });
    }

    function onDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveATask = active.data.current?.type === "Task";
        const isOverATask = over.data.current?.type === "Task";

        if (!isActiveATask) return;

        // Im dropping a Task over another Task
        if (isActiveATask && isOverATask) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);
                const overIndex = tasks.findIndex((t) => t.id === overId);

                if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
                    // Fix introduced after video recording
                    tasks[activeIndex].columnId = tasks[overIndex].columnId;
                    return arrayMove(tasks, activeIndex, overIndex - 1);
                }

                return arrayMove(tasks, activeIndex, overIndex);
            });
        }

        const isOverAColumn = over.data.current?.type === "Column";

        // Im dropping a Task over a column
        if (isActiveATask && isOverAColumn) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);

                tasks[activeIndex].columnId = overId;
                console.log("DROPPING TASK OVER COLUMN", { activeIndex });
                return arrayMove(tasks, activeIndex, activeIndex);
            });
        }
    }

    function handleCreateNewColumn() {
        const columnToAdd: Column = {
            id: generateId(),
            title: `Column ${columns.length + 1}`,
            contents: []
        };

        setColumns([...columns, columnToAdd]);
    }

    function handleDeleteColumn(id: Id) {
        const filteredColumns = columns.filter((col) => col.id !== id);
        setColumns(filteredColumns);
    }

    function hanleUpdateColumn(id: Id, title: string) {
        const newColumns = columns.map((col) => {
            if (col.id !== id) return col;
            return { ...col, title };
        });

        setColumns(newColumns);
    }

    function hanldeCreateTask(columnId: Id) {
        const newTask: Task = {
            id: generateId(),
            columnId,
            content: `Task ${tasks.length + 1}`,
        };

        columns.forEach(column => {
            if (column?.id === newTask?.columnId){
                return column?.contents?.push(newTask)
            }
        })

        setTasks([...tasks, newTask]);
        
    }

    function hanldeDeleteTask(id: Id) {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
    }

    function hanldeUpdateTask(id: Id, content: string) {
        const newTasks = tasks.map((task) => {
            if (task.id !== id) return task;
            return { ...task, content };
        });

        setTasks(newTasks);
    }

    return (
        <div
            className="
                m-auto
                flex
                flex-col
                w-full
                h-4/5
                overflow-y-hidden
                px-[20px]
                py-[20px]
            "
        >
            <button
                className="
                    w-52
                    h-9
                    bg-sky-700
                    text-white
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-md
                    shadow-lg
                "
                onClick={handleCreateNewColumn}
            >
                <AiOutlineFileAdd />
                Create
            </button>

            <DndContext
                sensors={sensors}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
            >
                <div
                    className="
                        mx-10
                        mt-10
                        h-full
                        flex
                        gap-10
                        justify-center
                        items-center
                    "
                >
                    <SortableContext items={columnsId}>
                        {columns?.map(column => (
                            <ColumnContainer 
                                key={column?.id} 
                                column={column}
                                createTask={hanldeCreateTask}
                                deleteTask={hanldeDeleteTask}
                                updateTask={hanldeUpdateTask}
                                deleteColumn={handleDeleteColumn}
                                updateColumn={hanleUpdateColumn}
                                tasks={tasks.filter((task) => task.columnId === column.id)}
                            />
                        ))}
                    </SortableContext>
                </div>

                {createPortal(
                    <DragOverlay>
                        {activeColumn && (
                            <ColumnContainer 
                                column={activeColumn}
                                createTask={hanldeCreateTask}
                                deleteTask={hanldeDeleteTask}
                                updateTask={hanldeUpdateTask}
                                deleteColumn={handleDeleteColumn}
                                updateColumn={hanleUpdateColumn}
                                tasks={tasks.filter(
                                    (task) => task.columnId === activeColumn.id
                                )}
                            />
                        )}
                        {activeTask && (
                            <TaskCard
                                task={activeTask}
                                deleteTask={hanldeDeleteTask}
                                updateTask={hanldeUpdateTask}
                            />
                        )}
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>
        </div>
    )
}

export default Board