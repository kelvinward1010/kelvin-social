"use client"
import getUserById from "@/app/actions/getUserById";
import Avatar from "@/app/components/Avatar";
import useUser from "@/app/hooks/useUser";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import { formatDistanceToNowStrict } from 'date-fns';
import useLike from "@/app/hooks/useLike";

interface PostItemProps {
    data: Record<string, any>;
    userId?: string;
    user?: any
}

const PostItem: React.FC<PostItemProps> = ({data = {}, userId, user}) => {

    const router = useRouter();
    const userPost = useUser(data?.userId);

    const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });
    console.log(hasLiked)
    
    const goToUser = useCallback((ev: any) => {
        
    }, []);

    const goToPost = useCallback(() => {
        
    }, []);

    const onLike = useCallback(async (ev: any) => {
        
    }, []);

    // const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

    const createdAt = useMemo(() => {
        if (!data?.createdAt) {
            return null;
        }

        return formatDistanceToNowStrict(new Date(data.createdAt));
    }, [data.createdAt])

    return (
        <div
            className="
                border-b-[1px]
                border-neutral-800
                p-5
                cursor-pointer
                hover:bg-neutral-900
                trasition
            "
            onClick={goToPost}
        >
            <div className="flex flex-row items-start gap-3">
                <Avatar user={userPost} image={userPost?.data?.image} />
                <div>
                    <div className="flex flex-row items-center gap-2">
                        <p
                            onClick={goToUser}
                            className="text-white font-semibold cursor-pointer hover:underline"
                        >
                            {user.name}
                        </p>
                        <span
                            onClick={goToUser}
                            className="text-neutral-500 cursor-pointer hover:underline hidden md:block"
                        >
                             @{user.username}
                        </span>
                        <span className="text-neutral-500 text-sm">
                            {createdAt}
                        </span>
                    </div>
                    <div className="text-white mt-1">
                        {data?.body}
                    </div>
                    <div className="flex flex-row items-center mt-3 gap-10">
                        <div className="
                            flex 
                            flex-row 
                            items-center 
                            text-neutral-500 
                            gap-2 
                            cursor-pointer 
                            transition 
                            hover:text-sky-500
                        ">
                            <AiOutlineMessage size={20} />
                            <p>
                                0
                            </p>
                        </div>
                        <div
                            onClick={onLike}
                            className="
                                flex 
                                flex-row 
                                items-center 
                                text-neutral-500 
                                gap-2 
                                cursor-pointer 
                                transition 
                                hover:text-red-500
                            "
                        >
                            {/* <LikeIcon color={hasLiked ? 'red' : ''} size={20} /> */}
                            <p>
                                {data.likedIds.length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostItem;