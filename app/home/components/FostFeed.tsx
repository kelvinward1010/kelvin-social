"use client"
import getUserById from "@/app/actions/getUserById";
import PostItem from "./PostItem";
import useUser from "@/app/hooks/useUser";
import getPosts from "@/app/actions/getPosts";
import usePosts from "@/app/hooks/usePosts";


interface PostFeedProps {
    userId?: string;
    postsOfUser?: [];
    ok?: boolean;
}

const PostFeed: React.FC<PostFeedProps> = ({userId, postsOfUser, ok}) => {

    const user =  useUser(userId as string);
    const posts = usePosts();

    const postAnalyst = (ok === true) ? postsOfUser : posts.data
    
    return (
        <>
            {postAnalyst?.map((post: Record<string, any>) => (
                <PostItem key={post?.id} user={user?.data} userId={userId} data={post} />
            ))}
        </>
    )
}

export default PostFeed;