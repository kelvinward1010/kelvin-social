import getPostById from "@/app/actions/getPostById";
import usePost from "@/app/hooks/usePost";

interface IParams {
    postId: string;
}

const Post = async ({ params }: { params: IParams }) => {
    const data = await getPostById(params.postId);

    console.log(data);

    return (
        <div className="">
            post here
        </div>
    )
}

export default Post;