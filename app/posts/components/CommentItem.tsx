"use client"

import Avatar from "@/app/components/Avatar";
import useUser from "@/app/hooks/useUser";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";



interface CommentItemProps {
    data: Record<string, any>;
}

const CommentItem: React.FC<CommentItemProps> = ({data ={}}) => {

    const router = useRouter();
    const user = useUser(data.userId as string);

    const goToUser = useCallback((ev: any) => {
        ev.stopPropagation();

        router.push(`/users/${data.user.id}`)
    }, [router, data?.user?.id]);

    const createdAt = useMemo(() => {
        if (!data?.createdAt) {
        return null;
        }

        return formatDistanceToNowStrict(new Date(data.createdAt));
    }, [data.createdAt])

    return(
        <div 
        className="
            border-b-[1px] 
            border-neutral-800 
            p-5
            pl-10
            cursor-pointer 
            hover:bg-neutral-900 
            transition
        ">
        <div className="flex flex-row items-start gap-3">
            <Avatar user={user} image={user?.data?.image} />
            <div>
            <div className="flex flex-row items-center gap-2">
                <p 
                onClick={goToUser} 
                className="
                    text-white 
                    font-semibold 
                    cursor-pointer 
                    hover:underline
                ">
                {user.data?.name}
                </p>
                <span 
                onClick={goToUser} 
                className="
                    text-neutral-500
                    cursor-pointer
                    hover:underline
                    hidden
                    md:block
                ">
                @{user?.data?.username}
                </span>
                <span className="text-neutral-500 text-sm">
                {createdAt}
                </span>
            </div>
            <div className="text-white mt-1">
                {data.body}
            </div>
            </div>
        </div>
        </div>
    )
}

export default CommentItem;