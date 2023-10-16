"use client"
import Avatar from "@/app/components/Avatar";
import useUser from "@/app/hooks/useUser";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import { formatDistanceToNowStrict } from 'date-fns';
import useLike from "@/app/hooks/useLike";
import usePost from "@/app/hooks/usePost";

interface PostItemProps {
    data: Record<string, any>;
    userId?: string;
    user?: any
}

const PostItem: React.FC<PostItemProps> = ({data = {}, userId, user}) => {

    const router = useRouter();
    const userPost = useUser(data?.userId);

    const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });
    const post = usePost(data?.id);
    
    const goToUser = useCallback((ev: any) => {
        ev.stopPropagation();

        router.push(`/users/${data?.userId}`)
    }, [router, userId]);

    const goToPost = useCallback(() => {
        router.push(`/posts/${data.id}`);
    }, [router, data?.id]);

    const onLike = useCallback(async (ev: any) => {
        ev.stopPropagation();
        toggleLike();
    }, [toggleLike]);

    const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

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
                <Avatar user={userPost} image={userPost?.data?.image || userPost?.data?.profileImage} />
                <div>
                    <div className="flex flex-row items-center gap-2">
                        <p
                            onClick={goToUser}
                            className="text-white font-semibold cursor-pointer hover:underline"
                        >
                            {userPost?.data?.name}
                        </p>
                        <span
                            onClick={goToUser}
                            className="text-neutral-500 cursor-pointer hover:underline hidden md:block"
                        >
                             @{userPost?.data?.username}
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
                                {post?.data?.comments?.length || 0}
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
                            <LikeIcon color={hasLiked ? 'red' : ''} size={20} />
                            <p>
                                {post?.data?.likedIds.length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostItem;