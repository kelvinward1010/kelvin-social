import getCurrentUser from "../actions/getCurrentUser";
import FormCreate from "../components/FormCreate";
import Header from "../components/Header";
import PostFeed from "../components/posts/FostFeed"


const HomePage = async () => {
    const currentUser = await getCurrentUser();
    return (
        <div className="">
            <Header label="Home" />
            <FormCreate user={currentUser} placeholder="What's happening...?"/>
            <PostFeed />
        </div>
    )
}

export default HomePage;