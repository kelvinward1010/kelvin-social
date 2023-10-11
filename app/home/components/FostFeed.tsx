import getUserById from "@/app/actions/getUserById";
import PostItem from "./PostItem";
import useUser from "@/app/hooks/useUser";
import getPosts from "@/app/actions/getPosts";
import getPostById from "@/app/actions/getPostById";
import { useRef } from "react";


interface PostFeedProps {
    userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = async ({userId}) => {

    const user = await getUserById(userId);
    const posts = await getPosts();

    const bottomRef = useRef<HTMLDivElement>(null);
    
    return (
        <>
            {posts.map((post: Record<string, any>) => (
                <PostItem key={post?.id} user={user} userId={userId} data={post} />
            ))}
        </>
    )
}

export default PostFeed;