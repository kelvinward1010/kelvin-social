import getUserById from "@/app/actions/getUserById";
import PostItem from "./PostItem";
import useUser from "@/app/hooks/useUser";


interface PostFeedProps {
    userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = async ({userId}) => {

    const data = {};
    const user = await getUserById(userId);
    
    return (
        <>
            <PostItem user={user} userId={userId} data={data} />
        </>
    )
}

export default PostFeed;