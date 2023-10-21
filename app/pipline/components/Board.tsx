"use client"
import { Column, Id } from "@/app/types";
import { useState } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import ColumnContainer from "./ColumnContainer";


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

            <div
                className="
                    mx-10
                    h-full
                    flex
                    gap-10
                    justify-center
                    items-center
                "
            >
                {columns?.map(column => (
                    <ColumnContainer 
                        key={column?.id} 
                        column={column}
                        deleteColumn={handleDeleteColumn}
                    />
                ))}
            </div>
        </div>
    )
}

export default Board