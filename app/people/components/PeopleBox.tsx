import Avatar from "@/app/components/Avatar";
import Button from "@/app/components/ButtonHome";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";



interface PeopleBoxProps {
    user?: Record<string, any>,
    name?: string
}

const PeopleBox: React.FC<PeopleBoxProps> = ({user}) => {

    console.log(user)

    const router = useRouter()

    const goMessage = useCallback((ev: any) => {

    },[])

    

    return (
        <div
            className="
                border-[1px]
                w-96
                h-50
                flex
                flex-row
                pt-5
                pl-5
                rounded-md
                m-8
            "
        >
            <div className="
                w-40
                h-40
                relative
            ">
                <Avatar 
                    user={user} 
                    image={user?.profileImage || user?.image} 
                    isLarge 
                />
            </div>
            <div>
                <div className="flex flex-col h-20">
                    <p className="text-white font-semibold text-lg">
                        {user?.name}
                    </p>
                    <p className="text-neutral-400 text-base">
                        @{user?.username}
                    </p>
                </div>
                <div
                    className="
                        flex
                        flex-row
                    "
                >
                    <Button secondary label="Follow" onClick={() => {}} />
                    <Button secondary label="Message" onClick={() => {}} />
                </div>
            </div>
        </div>
    )

}

export default PeopleBox;