"use client"
import CommentFeed from "../components/CommentFeed";
import PostItem from "@/app/home/components/PostItem";
import Header from "@/app/components/Header";
import FormCreate from "@/app/home/components/FormCreate";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import usePost from "@/app/hooks/usePost";
import Loading from "../loading";

interface IParams {
    postId: string;
}

const Post = ({ params }: { params: IParams }) => {
    const {data: fetchPost, isLoading} = usePost(params.postId);
    const currentUser = useCurrentUser();

    if (isLoading) {
        return (
          <Loading />
        )
    }
 
    return (
        <>
            <Header showBackArrow label="Tweet" />
            <PostItem key={fetchPost?.id} user={currentUser.data} userId={currentUser?.data?.id} data={fetchPost as Object} />
            <FormCreate isComment={true} placeholder="Tweet your reply..." user={currentUser?.data} postId={fetchPost?.id}/>
            <CommentFeed comments={fetchPost?.comments} />
        </>
    )
}

export default Post;