import getUserById from "@/app/actions/getUserById";
import PostItem from "./PostItem";
import useUser from "@/app/hooks/useUser";
import getPosts from "@/app/actions/getPosts";
import getPostById from "@/app/actions/getPostById";
import { useRef } from "react";
import usePosts from "@/app/hooks/usePosts";


interface PostFeedProps {
    userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = async ({userId}) => {

    const user = await getUserById(userId);
    const posts = await getPosts();
    
    return (
        <>
            {posts.map((post: Record<string, any>) => (
                <PostItem key={post?.id} user={user} userId={userId} data={post} />
            ))}
        </>
    )
}

export default PostFeed;