"use client"
import Avatar from "@/app/components/Avatar";
import Button from "@/app/components/ButtonHome";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";



interface PeopleBoxProps {
    user?: Record<string, any>,
    name?: string
}

const PeopleBox: React.FC<PeopleBoxProps> = ({user}) => {

    const router = useRouter()

    const goMessage = useCallback((ev: any) => {

    },[])

    const [isLoading, setIsLoading] = useState(false);

    const handleClick = useCallback(() => {
        setIsLoading(true);

        axios.post('/api/conversations', { userId: user?.id })
            .then((data) => {
                router.push(`/conversations/${user?.id}`);
            })
            .finally(() => setIsLoading(false));
    }, [user, router]);
    

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
                    <Button secondary label="See" onClick={() => router.push(`/users/${user?.id}`)} />
                    <Button secondary label="Message" onClick={() => handleClick()} />
                </div>
            </div>
        </div>
    )

}

export default PeopleBox;