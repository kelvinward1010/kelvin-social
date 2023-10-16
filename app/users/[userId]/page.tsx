"use client"
import Header from "@/app/components/Header"
import PostFeed from "@/app/home/components/FostFeed";
import useUser from "@/app/hooks/useUser";
import UserProfile from "../components/UserProfile";
import UserFollow from "../components/UserFollow";
import Loading from "../loading";


interface IParams {
    userId: string;
}

const UserProfilePage = ({params} : {params: IParams}) => {

    const { data: fetchedUser, isLoading } = useUser(params.userId);
    const postOfUser = fetchedUser?.posts;

    if (isLoading) {
        return (
          <Loading />
        )
    }
    
    return (
        <>
            <Header showBackArrow label={fetchedUser?.name}/>
            <UserProfile userId={fetchedUser?.id} />
            <UserFollow userId={fetchedUser?.id} />
            <PostFeed ok={true} userId={fetchedUser?.id} postsOfUser={postOfUser}/>
        </>
    )
}

export default UserProfilePage;