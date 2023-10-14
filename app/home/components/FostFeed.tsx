"use client"
import getUserById from "@/app/actions/getUserById";
import PostItem from "./PostItem";
import useUser from "@/app/hooks/useUser";
import getPosts from "@/app/actions/getPosts";
import usePosts from "@/app/hooks/usePosts";


interface PostFeedProps {
    userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({userId}) => {

    const user =  useUser(userId as string);
    const posts =  usePosts();
    
    return (
        <>
            {posts?.data?.map((post: Record<string, any>) => (
                <PostItem key={post?.id} user={user?.data} userId={userId} data={post} />
            ))}
        </>
    )
}

export default PostFeed;