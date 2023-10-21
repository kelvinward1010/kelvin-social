"use client"

import PostItem from "./PostItem";
import useUser from "@/app/hooks/useUser";
import usePosts from "@/app/hooks/usePosts";
import Loading from "../loading";


interface PostFeedProps {
    userId?: string;
    postsOfUser?: [];
    ok?: boolean;
}

const PostFeed: React.FC<PostFeedProps> = ({userId, postsOfUser, ok}) => {

    const user =  useUser(userId as string);
    const {data: posts, isLoading} = usePosts();

    const postAnalyst = (ok === true) ? postsOfUser : posts

    if (isLoading) {
        return (
          <Loading />
        )
    }
    
    return (
        <>
            {postAnalyst?.map((post: Record<string, any>) => (
                <PostItem key={post?.id} user={user?.data} userId={userId} data={post} />
            ))}
        </>
    )
}

export default PostFeed;