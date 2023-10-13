import getPostById from "@/app/actions/getPostById";
import getCurrentUser from "@/app/actions/getCurrentUser";
import CommentFeed from "../components/CommentFeed";
import PostItem from "@/app/home/components/PostItem";
import Header from "@/app/components/Header";
import FormCreate from "@/app/home/components/FormCreate";

interface IParams {
    postId: string;
}

const Post = async ({ params }: { params: IParams }) => {
    const data = await getPostById(params.postId);
    const currentUser = await getCurrentUser();

    return (
        <>
            <Header showBackArrow label="Tweet" />
            <PostItem key={data?.id} user={currentUser} userId={currentUser?.id} data={data as Object} />
            <FormCreate isComment={true} placeholder="Tweet your reply..." user={currentUser} postId={data?.id}/>
            <CommentFeed comments={data?.comments} />
        </>
    )
}

export default Post;