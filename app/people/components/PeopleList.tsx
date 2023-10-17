"use client"
import useUsers from "@/app/hooks/useUsers";
import PeopleBox from "./PeopleBox";



const PeopleList = () => {
    const {data: people, isLoading} = useUsers();

    return (
        <div className="p-5">
            <div className="flex flex-row">
                {people?.map((item: Record<string, any>) => (
                    <PeopleBox key={item?.id} user={item}/>
                ))}
            </div>
        </div>
    )
}

export default PeopleList;