import getCurrentUser from "../actions/getCurrentUser";
import FormCreate from "./components/FormCreate";
import Header from "../components/Header";
import PostFeed from "./components/FostFeed";


const HomePage = async () => {
    const currentUser = await getCurrentUser();

    return (
        <div className="">
            <Header label="Home" />
            <FormCreate postId={currentUser?.id} user={currentUser} placeholder="What's happening...?"/>
            <PostFeed userId={currentUser?.id}/>
        </div>
    )
}

export default HomePage;