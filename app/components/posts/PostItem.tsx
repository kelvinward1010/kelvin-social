

interface PostItemProps {
    data: Record<string, any>;
    userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({data = {}, userId}) => {


    return (
        <div>
            All Posts
        </div>
    )
}

export default PostItem;