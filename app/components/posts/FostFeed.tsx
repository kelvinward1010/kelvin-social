import PostItem from "./PostItem";


interface PostFeedProps {
    userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({userId}) => {

    const data = {};

    return (
        <>
            <PostItem data={data} />
        </>
    )
}

export default PostFeed;