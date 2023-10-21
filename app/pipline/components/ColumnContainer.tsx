"use client"
import { Column, Id } from "@/app/types";
import { AiOutlineDelete } from "react-icons/ai";


interface Props {
    column: Column;
    deleteColumn: (id: Id) => void;
}

function ColumnContainer({
    column,
    deleteColumn
}: Props) {

    const columnTitleStyle = (title: string) => {
        const titleStyle = title === 'Todo' 
            ? 'text-red-600' 
            : (title === 'Improgress' 
                ? 'text-cyan-600' 
                : 'text-green-600')
        return titleStyle;
    }

    return(
        <div className="
            w-96
            h-4/5
            border-2
            border-emerald-400
            rounded-md
            text-black
        ">
            <div
                className="
                    h-9
                    w-full
                    gap-1
                    flex
                    justify-between
                    items-center
                    pl-3
                    bg-white
                    rounded-md
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
        </div>
    )
}

export default ColumnContainer;