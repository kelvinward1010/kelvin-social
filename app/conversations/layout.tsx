import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";
import LayoutHome from "../components/LayoutHome"
import ConversationList from "./conponents/ConversationList"


export default async function ConversationsLayout({
    children
}: {
    children: React.ReactNode
}){

    const conversations = await getConversations();
    const users = await getUsers();

    return (
        <LayoutHome>
            <div className="h-full">
                <ConversationList 
                    users={users}
                    title="Messages"
                    initialItems={conversations}
                />
                {children}
            </div>
        </LayoutHome>
    )
}