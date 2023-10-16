"use client"
import usePost from "@/app/hooks/usePost";
import useUser from "@/app/hooks/useUser";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { BsTwitter } from "react-icons/bs";



interface NotificationItemProps {
    data: Record<string, any>;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ data = {} }) => {

    const router = useRouter();
    const user = useUser(data?.userId);
    const {data: post, isLoading, error} = usePost(data?.postId);

    const goToPost = useCallback((ev: any) => {
        ev.stopPropagation();

        router.push(`/posts/${post?.id}`)
    }, [router, post?.id]);

    const goToUser = useCallback((ev: any) => {
        ev.stopPropagation();

        router.push(`/users/${data?.followerId}`)
    }, [router, data?.followerId]);

    return (
        <>
            {data?.followerId && (
                <>
                    <div
                        onClick={goToUser}
                        key={data.id}
                        className="
                            flex 
                            flex-row 
                            items-center 
                            p-6 
                            gap-4 
                            border-b-[1px] 
                            border-neutral-800
                            hover:bg-neutral-900
                            cursor-pointer
                        "
                    >
                        <BsTwitter color="white" size={32} />
                        <p className="text-white">
                            {data.body}
                        </p>
                    </div>
                </>
            )}

            {data?.postId && (
                <>
                    <div
                        onClick={goToPost}
                        key={data.id}
                        className="
                            flex 
                            flex-row 
                            items-center 
                            p-6 
                            gap-4 
                            border-b-[1px] 
                            border-neutral-800
                            hover:bg-neutral-900
                            cursor-pointer
                        "
                    >
                            <BsTwitter color="white" size={32} />
                            <div className="
                                flex
                                flex-col
                            ">
                                <p className="text-white">
                                    {data.body}
                                </p>
                                <div className="
                                        flex 
                                        flex-row
                                        items-center
                                    "
                                >
                                    <p
                                        className="
                                            underline
                                            underline-offset-1
                                            text-blue-600
                                            text-sm
                                            line-clamp-1
                                        "
                                    >
                                        {' ' + post?.body}
                                    </p>
                                </div>
                            </div>
                    </div>
                </>
            )}
        </>
    )
}

export default NotificationItem;