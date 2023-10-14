"use client"
import CommentFeed from "../components/CommentFeed";
import PostItem from "@/app/home/components/PostItem";
import Header from "@/app/components/Header";
import FormCreate from "@/app/home/components/FormCreate";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import usePost from "@/app/hooks/usePost";

interface IParams {
    postId: string;
}

const Post = ({ params }: { params: IParams }) => {
    const data = usePost(params.postId);
    const currentUser = useCurrentUser();
 
    return (
        <>
            <Header showBackArrow label="Tweet" />
            <PostItem key={data?.data?.id} user={currentUser.data} userId={currentUser?.data?.id} data={data?.data as Object} />
            <FormCreate isComment={true} placeholder="Tweet your reply..." user={currentUser?.data} postId={data?.data?.id}/>
            <CommentFeed comments={data.data?.comments} />
        </>
    )
}

export default Post;